import { Module } from '@nestjs/common';
import { SateliteService } from './satelite.service';
import { SateliteController } from './satelite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatelliteEntity } from 'src/entity/satellite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SatelliteEntity]),
  ],
  providers: [SateliteService],
  controllers: [SateliteController]
})
export class SateliteModule {}
