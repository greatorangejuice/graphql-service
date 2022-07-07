import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { FavoriteInput } from './dto/favorite.input';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { TrackService } from '../track/track.service';
import { ArtistsService } from '../artists/artists.service';
import { IFavoriteType } from '../../utils/helper-models';
import { RemoveFavoriteInput } from './dto/remove-favorite.input';

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TrackService,
    private readonly artistsService: ArtistsService,
  ) {}

  // @Mutation(() => Favorite)
  // async addFavorite(
  //   @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput,
  // ) {
  //   return await this.favoriteService.create(createFavoriteInput);
  // }

  @Mutation(() => Favorite)
  async addTrackToFavorites(
    @Args('createFavoriteInput') createFavoriteInput: FavoriteInput,
  ) {
    return await this.favoriteService.create(
      createFavoriteInput,
      IFavoriteType.tracks,
    );
  }

  @Mutation(() => Favorite)
  async addBandToFavorites(
    @Args('createFavoriteInput') createFavoriteInput: FavoriteInput,
  ) {
    return await this.favoriteService.create(
      createFavoriteInput,
      IFavoriteType.bands,
    );
  }

  @Mutation(() => Favorite)
  async addArtistToFavorites(
    @Args('createFavoriteInput') createFavoriteInput: FavoriteInput,
  ) {
    return await this.favoriteService.create(
      createFavoriteInput,
      IFavoriteType.artists,
    );
  }

  @Mutation(() => Favorite)
  async addGenreToFavorites(
    @Args('createFavoriteInput') createFavoriteInput: FavoriteInput,
  ) {
    return await this.favoriteService.create(
      createFavoriteInput,
      IFavoriteType.genres,
    );
  }

  @Query(() => Favorite, { name: 'favorites' })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Mutation(() => Favorite)
  removeFavoriteGenre(@Args('removeFavoriteInput') input: FavoriteInput) {
    return this.favoriteService.remove(input, IFavoriteType.genres);
  }

  @Mutation(() => Favorite)
  removeFavoriteArtist(@Args('removeFavoriteInput') input: FavoriteInput) {
    return this.favoriteService.remove(input, IFavoriteType.artists);
  }

  @Mutation(() => Favorite)
  removeFavoriteBand(@Args('removeFavoriteInput') input: FavoriteInput) {
    return this.favoriteService.remove(input, IFavoriteType.bands);
  }

  @Mutation(() => Favorite)
  removeFavoriteTrack(@Args('removeFavoriteInput') input: FavoriteInput) {
    return this.favoriteService.remove(input, IFavoriteType.tracks);
  }

  @ResolveField()
  async tracks(@Parent() favorite: Favorite) {
    const { tracksIds } = favorite;
    return this.tracksService.findByIDs(tracksIds);
  }

  @ResolveField()
  async bands(@Parent() favorite: Favorite) {
    const { bandsIds } = favorite;
    const res = await this.bandsService.findByIDs(bandsIds);
    return res;
  }

  @ResolveField()
  async genres(@Parent() favorite: Favorite) {
    const { genresIds } = favorite;
    return this.genresService.findByIDs(genresIds);
  }

  @ResolveField()
  async artists(@Parent() favorite: Favorite) {
    const { artistsIds } = favorite;
    return this.artistsService.findByIDs(artistsIds);
  }
}
