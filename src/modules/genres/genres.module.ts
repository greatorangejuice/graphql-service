import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';

@Module({
  providers: [GenresResolver, GenresService],
  exports: [GenresService],
})
export class GenresModule {}
