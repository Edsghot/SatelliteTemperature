import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Satellite"})
export class SatelliteEntity{

    @PrimaryGeneratedColumn()
    IdSatellite: number;

    @Column()
    latitud: string;

    @Column()
    longitud: string;

    @Column({type: "double"})
    temperature: number;

    @Column()
    date: Date;
}