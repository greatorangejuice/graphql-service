import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from './directives/upper-case.directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './modules/artists/artists.module';
import { BandsModule } from './modules/bands/bands.module';
import { GenresModule } from './modules/genres/genres.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    AlbumModule,
    TrackModule,
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
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
