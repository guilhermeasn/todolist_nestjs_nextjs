import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodolistController } from './todolist.controller';
import { Todolist } from './todolist.entity';
import { TodolistService } from './todolist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist])],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
