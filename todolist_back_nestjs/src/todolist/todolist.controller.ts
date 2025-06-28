import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTodolistDto, UpdateTodolistDto } from './todolist.dto';
import { TodolistService } from './todolist.service';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  create(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistService.create(createTodolistDto);
  }

  @Get()
  findAll() {
    return this.todolistService.findAll();
  }

  @Delete()
  removeAll() {
    return this.todolistService.removeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.findOne(id);
  }

  @Get(':id_start/:id_end')
  findList(
    @Param('id_start', ParseIntPipe) start: number,
    @Param('id_end', ParseIntPipe) end: number
  ) {
    return this.todolistService.findList(start, end);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistService.update(id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todolistService.remove(id);
  }
}
