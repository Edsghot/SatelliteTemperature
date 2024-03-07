import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SatelliteEntity } from 'src/entity/satellite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SateliteService {
  constructor(
    @InjectRepository(SatelliteEntity)
    private satelliteRepository: Repository<SatelliteEntity>
  ) {}

  async CoordenadasAleatorias() {
    var u = new SatelliteEntity();

    try {
      var latitudconst = 509132;
      var longitudConst = 698721;

      for (var i = 0; i < 75318; i++) {
        latitudconst += 4;
        longitudConst += 4;
        u.latitud = '-13.' + latitudconst;
        u.longitud = '-72.' + longitudConst;
        u.temperature = await this.temperaturaAleatorio();
        const newSatellite = this.satelliteRepository.create(u);
        await this.satelliteRepository.save(newSatellite);
      }
      return 'termino';
    } catch (error) {
      return 'error' + error;
    }
  }

  async temperaturaAleatorio() {
    return Math.random() * (40 - 10) + 10;
  }
}
