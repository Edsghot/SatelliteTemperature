import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SatelliteEntity } from "./satellite.entity";

@Entity({name: "SatelliteForan"})
export class SatelliteForanEntity{

    @PrimaryGeneratedColumn()
    IdSatelliteForan: number;

    @Column({type: "float"})
    latitud: number;

    @Column({type: "float"})
    longitud: number;

    @Column({type: "float"})
    temperature: number;

    @ManyToOne(() => SatelliteEntity, satelite => satelite.sateliteForaneos)
    satelite: SatelliteEntity;
}