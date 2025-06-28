import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './todolist.entity';
import { TodolistService } from './todolist.service';

describe('TodolistService', () => {
  let service: TodolistService;
  let repository: Repository<Todolist>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    clear: jest.fn(),
    remove: jest.fn(),
    delete: jest.fn(),
    findAndCount: jest.fn(),
    findOneByOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodolistService,
        {
          provide: getRepositoryToken(Todolist),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodolistService>(TodolistService);
    repository = module.get<Repository<Todolist>>(getRepositoryToken(Todolist));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a todo item', async () => {
      const dto = { item: 'Test todo' };
      const createdEntity = { id: 1, ...dto };

      mockRepository.create.mockReturnValue(dto);
      mockRepository.save.mockResolvedValue(createdEntity);

      const result = await service.create(dto);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdEntity);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [{ id: 1, item: 'Test', done: false }];
      mockRepository.find.mockResolvedValue(todos);

      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should find one todo by id', async () => {
      const todo = { id: 5, item: 'Find me' };
      mockRepository.findOneBy.mockResolvedValue(todo);

      const result = await service.findOne(5);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 5 });
      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
    });
  });

  describe('findList', () => {
    it('should return todos between start and end ids', async () => {
      const todos = [{ id: 2, item: 'Start' }, { id: 4, item: 'End' }];
      mockRepository.find.mockResolvedValue(todos);

      const result = await service.findList(2, 4);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { id: expect.anything() }, // or specifically Between(2,4)
      });
      expect(result).toEqual(todos);
    });
  });

  describe('update', () => {
    it('should update a todo and return it', async () => {
      const existing = { id: 3, item: 'Old', done: false };
      const dto = { done: true };
      const merged = { ...existing, ...dto };

      mockRepository.findOneBy.mockResolvedValue(existing);
      mockRepository.merge.mockImplementation((obj, dto) => Object.assign(obj, dto));
      mockRepository.save.mockResolvedValue(merged);

      const result = await service.update(3, dto);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 3 });
      expect(mockRepository.merge).toHaveBeenCalledWith(existing, dto);
      expect(mockRepository.save).toHaveBeenCalledWith(existing);
      expect(result).toEqual(merged);
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      const dto = { done: true };

      await expect(service.update(99, dto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
    });
  });

  describe('removeAll', () => {
    it('should clear all todos and return message', async () => {
      mockRepository.clear.mockResolvedValue(undefined);

      const result = await service.removeAll();
      expect(mockRepository.clear).toHaveBeenCalled();
      expect(result).toBe('All Items Removed');
    });
  });

  describe('remove', () => {
    it('should remove a todo by id and return message', async () => {
      const existing = { id: 7, item: 'To remove' };
      mockRepository.findOneBy.mockResolvedValue(existing);
      mockRepository.remove.mockResolvedValue(existing);

      const result = await service.remove(7);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 7 });
      expect(mockRepository.remove).toHaveBeenCalledWith(existing);
      expect(result).toBe('Item Removed');
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
    });
  });
});
