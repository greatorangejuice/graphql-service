import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { ArtistsModule } from '../artists/artists.module';
import { GenresModule } from '../genres/genres.module';
import { BandsModule } from '../bands/bands.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [ArtistsModule, GenresModule, BandsModule, TrackModule],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
