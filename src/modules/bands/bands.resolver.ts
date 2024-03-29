import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { Band } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { PaginationInput } from '../../utils/dto/pagination.input';
import { RemovedItem } from '../artists/entities/removeArtist.entity';
import { GenresService } from '../genres/genres.service';
import { ArtistsService } from '../artists/artists.service';

@Resolver(() => Band)
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation(() => Band)
  async createBand(@Args('createBandInput') createBandInput: CreateBandInput) {
    createBandInput.members = createBandInput.members.map(
      ({ id: _id, ...rest }) => {
        return { _id, ...rest };
      },
    );
    return await this.bandsService.create(createBandInput);
  }
  // const newArrayOfObj = arrayOfObj.map(({key1: stroke, ...rest}) => ({stroke,...rest}));
  @Query(() => [Band], { name: 'bands' })
  async findAll(
    @Args({
      name: 'paginationInput',
      nullable: true,
      defaultValue: { limit: 5, offset: 0 },
    })
    paginationInput?: PaginationInput,
  ) {
    return await this.bandsService.findAll(paginationInput);
  }

  @Query(() => Band, { name: 'band' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  async updateBand(@Args('updateBandInput') updateBandInput: UpdateBandInput) {
    updateBandInput.members = updateBandInput.members.map(
      ({ id: _id, ...rest }) => {
        return { _id, ...rest };
      },
    );
    return await this.bandsService.update(updateBandInput.id, updateBandInput);
  }

  @Mutation(() => RemovedItem)
  async removeBand(@Args('id', { type: () => ID }) id: string) {
    return await this.bandsService.remove(id);
  }

  @ResolveField()
  async genres(@Parent() band: Band) {
    const { genresIds } = band;
    return await this.genresService.findByIDs(genresIds);
  }

  @ResolveField()
  async members(@Parent() band: Band) {
    const { members } = band;
    const idS = [];
    members.forEach((member) => {
      idS.push(member._id);
    });
    return (
      await Promise.all(
        members.map(async (member) => {
          return await this.artistsService.findOne(member._id);
        }),
      )
    ).map((artist, index) => ({
      // artist: artist,
      firstName: artist.firstName,
      secondName: artist.secondName,
      middleName: artist.middleName,
      instrument: members[index].instrument,
      years: members[index].years,
    }));
  }
}
