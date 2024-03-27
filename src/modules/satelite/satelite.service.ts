import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertDto } from 'src/dto/insert.dto';
import { updateTemperatureDto } from 'src/dto/updateTemperature.dto';
import { SatelliteForanEntity } from 'src/entity/sateliteForan.entity';
import { SatelliteEntity } from 'src/entity/satellite.entity';
import { LegacyOracleNamingStrategy, Repository } from 'typeorm';

@Injectable()
export class SateliteService {
  constructor(
    @InjectRepository(SatelliteEntity)
    private satelliteRepository: Repository<SatelliteEntity>,
    @InjectRepository(SatelliteForanEntity)
    private satelliteForanRepository: Repository<SatelliteForanEntity>
  ) {}

  async insertarCoordenadas(coordT: InsertDto) {
    var u = new SatelliteEntity();
    var n = new SatelliteForanEntity();
    try {
      
      u.date = new Date();
      u.latitud = coordT.latitud;
      u.longitud = coordT.longitud;
      u.temperature = coordT.temperature;
      const newSatellite = this.satelliteRepository.create(u);
      await this.satelliteRepository.save(newSatellite);
  
      
      const radius = 50; // Radio en metros alrededor del satélite principal
      const numPoints = 20; // Número de satélites secundarios
      
      const centerLat = u.latitud; // Latitud del satélite principal
      const centerLng = u.longitud; // Longitud del satélite principal
      const randomCoordinates = this.generateRandomCoordinates(centerLat, centerLng, radius, numPoints);
      
      for (const coord of randomCoordinates) {
        const newSatelliteForan = this.satelliteForanRepository.create({
          latitud: coord.lat,
          longitud: coord.lng,
          temperature: coordT.temperature,
          satelite: newSatellite, // Asigna el satélite principal
        });
        await this.satelliteForanRepository.save(newSatelliteForan);
      }
  
      return {msg:'se inserto correctamente',success: true};
    } catch (error) {
      return {msg:'error: ',detailMsg: error,sucess: false};
    }
  }
  
  generateRandomCoordinates(centerLat: number, centerLng: number, radius: number, numPoints: number): { lat: number, lng: number }[] {
    const result = [];
    const radiusInDegrees = radius / 111300; // Approximate conversion from meters to degrees
  
    for (let i = 0; i < numPoints; i++) {
      const randomRadius = Math.random() * radiusInDegrees;
      const randomAngle = Math.random() * 2 * Math.PI;
      const lat = centerLat + randomRadius * Math.cos(randomAngle);
      const lng = centerLng + randomRadius * Math.sin(randomAngle);
      result.push({ lat, lng });
    }
  
    return result;
  }
  

  async getConflagration(){
    var val = await this.satelliteRepository.query("CALL ps_Incendios()");
    return {msg:"lista de incendios",value: val[0]};
  }
  async getSatellite(){
    var val = await this.satelliteRepository.query("CALL getSatellites()");
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
