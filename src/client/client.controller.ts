import { Controller, Get, Post, Body, Put, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }
  
  @Get('/neighborhood')
  findByNeighborhood(@Query('neighborhood') neighborhood: string) {
    return this.clientService.findByNeighborhood(neighborhood);
  }

  @Get('/login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
    @Res() res: Response,
    ) {
      const user = await this.clientService.login(email, password);

      if (!user) return res.status(404).send('Cliente não encontrado');

      return res.status(200).send(user);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }


  @Put()
  update(@Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
