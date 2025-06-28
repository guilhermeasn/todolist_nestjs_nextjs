import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpMessage } from 'src/helpers';
import { Between, Repository } from 'typeorm';
import { CreateTodolistDto, UpdateTodolistDto } from './todolist.dto';
import { Todolist } from './todolist.entity';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private repository: Repository<Todolist>,
  ) {}

  create(createTodolistDto: CreateTodolistDto) : Promise<Todolist> {
    const item = this.repository.create(createTodolistDto);
    return this.repository.save(item);
  }

  findAll() : Promise<Todolist[]> {
    return this.repository.find();
  }

  findList(start: number, end: number) : Promise<Todolist[]> {
    return this.repository.find({
      where: {
        id: Between(start, end)
      }
    });
  }

  async findOne(id: number) : Promise<Todolist> {
    const item = await this.repository.findOneBy({ id });
    if(!item) throw new NotFoundException('ID Not Found');
    return item;
  }

  async update(id: number, updateTodolistDto: UpdateTodolistDto) : Promise<Todolist> {
    const item = await this.repository.findOneBy({ id });
    if(!item) throw new NotFoundException('ID Not Found');
    this.repository.merge(item, updateTodolistDto);
    return this.repository.save(item);
  }

  async removeAll() : Promise<HttpMessage> {
    await this.repository.clear();
    return { message: 'All Items Removed' };
  }

  async remove(id: number) : Promise<HttpMessage> {
    const item = await this.repository.findOneBy({ id });
    if(!item) throw new NotFoundException('ID Not Found');
    await this.repository.remove(item);
    return { message: 'Item Removed' };
  }
}
