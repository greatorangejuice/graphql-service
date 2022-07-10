import { forwardRef, Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [GenresModule, forwardRef(() => ArtistsModule)],
  providers: [BandsResolver, BandsService],
  exports: [BandsService],
})
export class BandsModule {}
