import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { Band } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';

@Resolver(() => Band)
export class BandsResolver {
  constructor(private readonly bandsService: BandsService) {}

  @Mutation(() => Band)
  async createBand(@Args('createBandInput') createBandInput: CreateBandInput) {
    return await this.bandsService.create(createBandInput);
  }

  @Query(() => [Band], { name: 'bands' })
  async findAll() {
    return await this.bandsService.findAll();
  }

  @Query(() => Band, { name: 'band' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  async updateBand(@Args('updateBandInput') updateBandInput: UpdateBandInput) {
    return await this.bandsService.update(updateBandInput.id, updateBandInput);
  }

  @Mutation(() => Band)
  async removeBand(@Args('id', { type: () => ID }) id: string) {
    return await this.bandsService.remove(id);
  }
}
