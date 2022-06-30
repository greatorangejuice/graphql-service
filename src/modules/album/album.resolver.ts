import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { RemovedItem } from '../artists/entities/removeArtist.entity';

@Resolver(() => Album)
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}

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
}
