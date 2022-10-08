import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.data-source';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  async create(createClientDto: CreateClientDto) {
    return await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values(createClientDto)
      .execute();
  }

  async findAll() {
    return await AppDataSource
      .createQueryBuilder()
      .select('c')
      .from(Client, 'c')
      .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .select('c')
      .from(Client, 'c')
      .where('c.id=:clientId', { clientId: id })
      .getOne();
  }

  async findByNeighborhood(neighborhood: string) {
    console.log(neighborhood);
    return await AppDataSource
      .createQueryBuilder()
      .select('c')
      .from(Client, 'c')
      .where('c.neighborhood=:clientNeighborhood', { clientNeighborhood: neighborhood })
      .getMany();
  }

  async update(updateClientDto: UpdateClientDto) {
    return await AppDataSource
      .createQueryBuilder()
      .update(Client)
      .set(updateClientDto)
      .where('id=:clientId', { clientId: updateClientDto.id })
      .execute();
  }

  async remove(id: number) {
    return await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Client)
      .where('id=:clientId', { clientId: id })
      .execute();
  }

  async login(email: string, password: string) {
    const user = await AppDataSource
      .createQueryBuilder()
      .select('u')
      .from(Client, 'u')
      .where('u.email=:email', { email })
      .andWhere('u.password=:password', { password })
      .getOne();

    if (!user) return user;

    const userDto = {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      neighborhood: user.neighborhood,
      email: user.email,
      receiveEmail: user.receiveEmail,
    }

      return userDto;
  }
}
