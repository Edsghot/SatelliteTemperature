import { Controller, Post } from '@nestjs/common';
import { SateliteService } from './satelite.service';

@Controller('satelite')
export class SateliteController {

    constructor(private sateliteService: SateliteService)
    {}

    @Post()
    async getUsers() {
    return await this.sateliteService.CoordenadasAleatorias();
  }
}
