import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [AlbumResolver, AlbumService],
  imports: [ArtistsModule, BandsModule, GenresModule],
})
export class AlbumModule {}
