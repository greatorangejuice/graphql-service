import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';

@Module({
  providers: [BandsResolver, BandsService],
  exports: [BandsService],
})
export class BandsModule {}
