import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Satellite"})
export class SatelliteEntity{

    @PrimaryGeneratedColumn()
    IdSatellite: number;

    @Column({type: "double"})
    latitud: number;

    @Column({type: "double"})
    longitud: number;

    @Column({type: "double"})
    temperature: number;

    @Column()
    date: Date;
}