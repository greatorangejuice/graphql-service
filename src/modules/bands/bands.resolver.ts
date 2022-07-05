import {
  Args,
  ID,
  Mutation,
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

@Resolver(() => Band)
export class BandsResolver {
  constructor(private readonly bandsService: BandsService) {}

  @Mutation(() => Band)
  async createBand(@Args('createBandInput') createBandInput: CreateBandInput) {
    return await this.bandsService.create(createBandInput);
  }

  @Query(() => [Band], { name: 'bands' })
  async findAll(@Args('paginationInput') paginationInput: PaginationInput) {
    return await this.bandsService.findAll(paginationInput);
  }

  @Query(() => Band, { name: 'band' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  async updateBand(@Args('updateBandInput') updateBandInput: UpdateBandInput) {
    return await this.bandsService.update(updateBandInput.id, updateBandInput);
  }

  @Mutation(() => RemovedItem)
  async removeBand(@Args('id', { type: () => ID }) id: string) {
    return await this.bandsService.remove(id);
  }
}
