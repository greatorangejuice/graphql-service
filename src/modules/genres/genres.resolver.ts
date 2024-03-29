import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { RemovedItem } from '../artists/entities/removeArtist.entity';
import { PaginationInput } from '../../utils/dto/pagination.input';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  async createGenre(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
  ) {
    return await this.genresService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  async findAll(
    @Args({
      name: 'paginationInput',
      nullable: true,
      defaultValue: { limit: 5, offset: 0 },
    })
    paginationInput?: PaginationInput,
  ) {
    return await this.genresService.findAll(paginationInput);
  }

  @Query(() => Genre, { name: 'genre' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
  ) {
    return await this.genresService.update(
      updateGenreInput.id,
      updateGenreInput,
    );
  }

  @Mutation(() => RemovedItem)
  async removeGenre(@Args('id', { type: () => ID }) id: string) {
    return await this.genresService.remove(id);
  }
}
