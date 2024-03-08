import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateTemperatureDto } from 'src/dto/updateTemperature.dto';
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
      var latitudconst = 517352;
      var longitudConst = 706941;

      for (var i = 0; i < 73263; i++) {
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

  async getConflagration(){
    var val = await this.satelliteRepository.query("CALL ps_Incendios()");
    return {value: val[0]};
  }

  async updateTemperature(data: updateTemperatureDto){
    
    var satellite = await this.satelliteRepository.findOne({where: {IdSatellite:data.IdSatellite}})

    if(!satellite){
      return {value: null,msg:"no se encontro esa latitud"};
    }

    satellite.temperature = data.Temperature;
    satellite.date = new Date();

    var fin = await this.satelliteRepository.save(satellite);

    return {value: fin,msg:"se actualizo correctamente"};
}

  async getById(id: number){
    var satellite = await this.satelliteRepository.findOne({where:{IdSatellite:id}});

    if(!satellite){
      return {value: null,msg:"No existe ningun dato"}
    }

    return {value: satellite};
  }

  async temperaturaAleatorio() {
    return Math.random() * (40 - 10) + 10;
  }
}
