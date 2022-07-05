import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { RemovedItem } from '../artists/entities/removeArtist.entity';
import { BandsService } from '../bands/bands.service';
import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { TrackService } from '../track/track.service';

@Resolver(() => Album)
export class AlbumResolver {
  constructor(
    private readonly albumService: AlbumService,
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TrackService,
  ) {}

  @Mutation(() => Album)
  async createAlbum(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
  ) {
    return await this.albumService.create(createAlbumInput);
  }

  @Query(() => [Album], { name: 'albums' })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Query(() => Album, { name: 'album' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.albumService.findOne(id);
  }

  @Mutation(() => Album)
  async updateAlbum(
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
  ) {
    return await this.albumService.update(
      updateAlbumInput.id,
      updateAlbumInput,
    );
  }

  @Mutation(() => RemovedItem)
  async removeAlbum(@Args('id', { type: () => ID }) id: string) {
    return await this.albumService.remove(id);
  }

  @ResolveField()
  async bands(@Parent() album: Album) {
    const { bandsIds } = album;
    return this.bandsService.findByIDs(bandsIds);
  }

  @ResolveField()
  async artists(@Parent() album: Album) {
    const { artistsIds } = album;
    return this.artistsService.findByIDs(artistsIds);
  }

  @ResolveField()
  async genres(@Parent() album: Album) {
    const { genresIds } = album;
    return this.genresService.findByIDs(genresIds);
  }

  @ResolveField()
  async tracks(@Parent() album: Album) {
    const { trackIds } = album;
    return this.tracksService.findByIDs(trackIds);
  }
}
