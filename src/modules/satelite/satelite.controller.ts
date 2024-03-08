import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SateliteService } from './satelite.service';
import { updateTemperatureDto } from 'src/dto/updateTemperature.dto';

@Controller('satelite')
export class SateliteController {

    constructor(private sateliteService: SateliteService)
    {}

    @Post()
    async getCoordenate() {
    return await this.sateliteService.CoordenadasAleatorias();
    }

    @Get('/conflagration')
    async getConflagration(){
        return await this.sateliteService.getConflagration();
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
