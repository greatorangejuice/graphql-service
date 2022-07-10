import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [AlbumResolver, AlbumService],
  imports: [
    ArtistsModule,
    BandsModule,
    GenresModule,
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
