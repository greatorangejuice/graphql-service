import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from './directives/upper-case.directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
