import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { BandsModule } from '../bands/bands.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumModule } from '../album/album.module';

@Module({
  providers: [TrackResolver, TrackService],
  exports: [TrackService],
  imports: [BandsModule, ArtistsModule, forwardRef(() => AlbumModule)],
})
export class TrackModule {}

// forwardRef(() => BandsModule),
//   forwardRef(() => ArtistsModule),
