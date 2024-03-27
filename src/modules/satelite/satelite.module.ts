import { Module } from '@nestjs/common';
import { SateliteService } from './satelite.service';
import { SateliteController } from './satelite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatelliteEntity } from 'src/entity/satellite.entity';
import { SatelliteForanEntity } from 'src/entity/sateliteForan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SatelliteEntity]),TypeOrmModule.forFeature([SatelliteForanEntity])
  ],
  providers: [SateliteService],
  controllers: [SateliteController]
})
export class SateliteModule {}
