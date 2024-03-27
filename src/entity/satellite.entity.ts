import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SatelliteForanEntity } from "./sateliteForan.entity";

@Entity({name: "Satellite"})
export class SatelliteEntity{

    @PrimaryGeneratedColumn()
    IdSatellite: number;

    @Column({type: "float"})
    latitud: number;

    @Column({type: "float"})
    longitud: number;

    @Column({type: "float"})
    temperature: number;

    @Column()
    date: Date;

    @OneToMany(() => SatelliteForanEntity, sateliteForaneos => sateliteForaneos.IdSatelliteForan)
    sateliteForaneos: SatelliteForanEntity[];
}