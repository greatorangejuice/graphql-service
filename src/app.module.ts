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
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
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
      context: ({ req }): object => {
        const token = req.headers.authorization || '';
        process.env.AUTH_TOKEN = token;
        return { token };
      },
      formatError: (error) => {
        const errorMessage =
          // @ts-ignore
          error.extensions?.exception?.response?.message || error.message;
        const message = errorMessage.replace(
          /Cannot return null for non-nullable field/,
          'Entity does not exist. Try to add new: ',
        );
        const graphQLFormattedError = {
          message,
          code: error.extensions?.exception?.code || 'SERVER_ERROR',
          // @ts-ignore
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
