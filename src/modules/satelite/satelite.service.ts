import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertDto } from 'src/dto/insert.dto';
import { updateTemperatureDto } from 'src/dto/updateTemperature.dto';
import { SatelliteEntity } from 'src/entity/satellite.entity';
import { LegacyOracleNamingStrategy, Repository } from 'typeorm';

@Injectable()
export class SateliteService {
  constructor(
    @InjectRepository(SatelliteEntity)
    private satelliteRepository: Repository<SatelliteEntity>
  ) {}

  async insertarCoordenadas(coord: InsertDto) {
    var u = new SatelliteEntity();

    try {
      
      u.date = new Date();
      u.latitud = coord.latitud;
      u.longitud = coord.longitud;
      u.temperature = coord.temperature;
      const newSatellite = this.satelliteRepository.create(u);
      await this.satelliteRepository.save(newSatellite);

      return {msg:'se inserto correctamente',success: true};
    } catch (error) {
      return {msg:'error: ',detailMsg: error,sucess: false};
    }
  }

  async getConflagration(){
    var val = await this.satelliteRepository.query("CALL ps_Incendios()");
    return {msg:"lista de incendios",value: val[0]};
  }

  async getRecentFires(){
    try{
      var val = await this.satelliteRepository.query("CALL SP_IncendioFechaReciente()");
      return {msg:"lista de incendios recientes",value: val[0],sucess:true};
    
    }catch(e){
      return {msg: "Error al consultar", detail: e,sucess:false}
    }
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

  async getTest(){
    return this.temperaturaAleatorio();
  }

  async temperaturaAleatorio() {
    return Math.random() * (100 - 40) + 40;
  }
}
