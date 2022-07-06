import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { TrackService } from '../track/track.service';
import { ArtistsService } from '../artists/artists.service';

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TrackService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation(() => Favorite)
  async addFavorite(
    @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput,
  ) {
    return await this.favoriteService.create(createFavoriteInput);
  }

  @Query(() => Favorite, { name: 'favorites' })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Mutation(() => Favorite)
  removeFavorite(@Args('createFavoriteInput') input: CreateFavoriteInput) {
    console.log(input);
    return this.favoriteService.remove(input);
  }

  @ResolveField()
  async tracks(@Parent() favorite: Favorite) {
    const { tracksIds } = favorite;
    return this.tracksService.findByIDs(tracksIds);
  }

  @ResolveField()
  async bands(@Parent() favorite: Favorite) {
    console.log('IN BAND');
    const { bandsIds } = favorite;
    console.log('bandsIds', bandsIds);
    const res = await this.bandsService.findByIDs(bandsIds);
    console.log('bands', res);
    return res;
  }

  @ResolveField()
  async genres(@Parent() favorite: Favorite) {
    const { genresIds } = favorite;
    console.log('genresIds', genresIds);
    return this.genresService.findByIDs(genresIds);
  }

  @ResolveField()
  async artists(@Parent() favorite: Favorite) {
    const { artistsIds } = favorite;
    console.log('artistsIds', artistsIds);
    return this.artistsService.findByIDs(artistsIds);
  }
}
