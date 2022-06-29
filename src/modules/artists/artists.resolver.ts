import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { RemovedItem } from './entities/removeArtist.entity';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation(() => Artist)
  async createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
  ) {
    return await this.artistsService.create(createArtistInput);
  }

  @Query(() => [Artist], { name: 'artists' })
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Query(() => Artist, { name: 'artist' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.artistsService.findOne(id);
  }

  @Mutation(() => Artist)
  async updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
  ) {
    return await this.artistsService.update(
      updateArtistInput.id,
      updateArtistInput,
    );
  }

  @Mutation(() => RemovedItem)
  async deleteArtist(@Args('id', { type: () => ID }) id: string) {
    return await this.artistsService.remove(id);
  }
}
