import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SateliteService } from './satelite.service';
import { updateTemperatureDto } from 'src/dto/updateTemperature.dto';
import { InsertDto } from 'src/dto/insert.dto';

@Controller('satelite')
export class SateliteController {

    constructor(private sateliteService: SateliteService)
    {}

    @Post('/insert')
    async getCoordenate(@Body() coord : InsertDto) {
    return await this.sateliteService.insertarCoordenadas(coord);
    }

    @Get('/conflagration')
    async getConflagration(){
        return await this.sateliteService.getConflagration();
    }

    @Get('/test')
    async test(){
        return await this.sateliteService.getTest();
    }

    @Get('/coordenate/:id')
    async getById(@Param('id') id: number){
        return await this.sateliteService.getById(id);
    }

    @Put('/update')
    async updateTemperature (@Body() data: updateTemperatureDto) {
        return await this.sateliteService.updateTemperature(data);
    }
}
