import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';
import { BandsModule } from '../bands/bands.module';

@Module({
  imports: [forwardRef(() => BandsModule)],
  providers: [ArtistsResolver, ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
