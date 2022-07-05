import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { AlbumService } from '../album/album.service';
import { BandsService } from '../bands/bands.service';
import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { Album } from '../album/entities/album.entity';
import { PaginationInput } from '../../utils/dto/pagination.input';

@Resolver(() => Track)
export class TrackResolver {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
  ) {}

  @Mutation(() => Track)
  async createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
  ) {
    return await this.trackService.create(createTrackInput);
  }

  @Query(() => [Track], { name: 'tracks' })
  async findAll(
    @Args({
      name: 'paginationInput',
      nullable: true,
      defaultValue: { limit: 5, offset: 0 },
    })
    paginationInput?: PaginationInput,
  ) {
    return await this.trackService.findAll(paginationInput);
  }

  @Query(() => Track, { name: 'track' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.trackService.findOne(id);
  }

  @Mutation(() => Track)
  async updateTrack(
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
  ) {
    return await this.trackService.update(
      updateTrackInput.id,
      updateTrackInput,
    );
  }

  @Mutation(() => Track)
  async removeTrack(@Args('id', { type: () => ID }) id: string) {
    return await this.trackService.remove(id);
  }

  @ResolveField()
  async album(@Parent() track: Track) {
    const { albumId } = track;
    return await this.albumService.findOne(albumId);
  }

  @ResolveField()
  async bands(@Parent() track: Track) {
    const { bandsIds } = track;
    return await this.bandsService.findByIDs(bandsIds);
  }

  @ResolveField()
  async artists(@Parent() track: Track) {
    const { artistsIds } = track;
    return await this.artistsService.findByIDs(artistsIds);
  }

  @ResolveField()
  async genres(@Parent() track: Track) {
    const { genresIds } = track;
    return await this.genresService.findByIDs(genresIds);
  }
}
