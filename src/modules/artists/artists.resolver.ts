import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { RemovedItem } from './entities/removeArtist.entity';
import { BandsModule } from '../bands/bands.module';
import { Album } from '../album/entities/album.entity';
import { BandsService } from '../bands/bands.service';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
  ) {}

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
  async findOne(@Args('id', { type: () => ID }) id: string) {
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
  async removeArtist(@Args('id', { type: () => ID }) id: string) {
    return await this.artistsService.remove(id);
  }

  @ResolveField()
  async bands(@Parent() artist: Artist) {
    const { bandsIds } = artist;
    return await this.bandsService.findByIDs(bandsIds);
  }
}
