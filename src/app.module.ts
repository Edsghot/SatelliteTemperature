import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SateliteModule } from './modules/satelite/satelite.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'ccontrolz.com',
    port: 3306,
    username: 'nibcqvah_edsghot',
    password: 'Repro123.',
    database: 'nibcqvah_satellite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}), SateliteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
