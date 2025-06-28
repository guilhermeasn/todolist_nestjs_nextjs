import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from './todolist.controller';
import { CreateTodolistDto, UpdateTodolistDto } from './todolist.dto';
import { TodolistService } from './todolist.service';

describe('TodolistController', () => {
  let controller: TodolistController;
  let service: TodolistService;

  // Mock simples do service
  const mockTodolistService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, item: 'Test', done: false }]),
    removeAll: jest.fn(() => ({ deleted: true })),
    findOne: jest.fn(id => ({ id, item: 'Test', done: false })),
    findList: jest.fn((start, end) => [{ id: start, item: 'Start', done: false }, { id: end, item: 'End', done: true }]),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ deletedId: id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [
        {
          provide: TodolistService,
          useValue: mockTodolistService,
        },
      ],
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
    service = module.get<TodolistService>(TodolistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo and return it', () => {
      const dto: CreateTodolistDto = { item: 'Learn NestJS' };
      expect(controller.create(dto)).toEqual({ id: 1, item: 'Learn NestJS' });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', () => {
      expect(controller.findAll()).toEqual([{ id: 1, item: 'Test', done: false }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('removeAll', () => {
    it('should remove all todos', () => {
      expect(controller.removeAll()).toEqual({ deleted: true });
      expect(service.removeAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one todo by id', () => {
      expect(controller.findOne(5)).toEqual({ id: 5, item: 'Test', done: false });
      expect(service.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('findList', () => {
    it('should return todos between start and end ids', () => {
      expect(controller.findList(2, 4)).toEqual([
        { id: 2, item: 'Start', done: false },
        { id: 4, item: 'End', done: true },
      ]);
      expect(service.findList).toHaveBeenCalledWith(2, 4);
    });
  });

  describe('update', () => {
    it('should update a todo and return it', () => {
      const dto: UpdateTodolistDto = { done: true };
      expect(controller.update(3, dto)).toEqual({ id: 3, done: true });
      expect(service.update).toHaveBeenCalledWith(3, dto);
    });
  });

  describe('remove', () => {
    it('should remove a todo by id', () => {
      expect(controller.remove(10)).toEqual({ deletedId: 10 });
      expect(service.remove).toHaveBeenCalledWith(10);
    });
  });
});
