import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryRepository } from 'src/models/category/category.repository';

describe('CategoryService', () => {
  let service: CategoryService;

  const repository = {
    getOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          CategoryService,
          {
            provide: CategoryRepository,
            useValue: repository,
          },
        ],
      }).compile();

    service =
      module.get<CategoryService>(CategoryService);
  });

  it('should create category', async () => {
    repository.getOne.mockResolvedValue(null);

    repository.create.mockResolvedValue({
      _id: 'category-id',
      name: 'pizza',
    });

    const result = await service.create({
      name: 'pizza',
      slug: 'pizza',
      logo: '',
      folderId: '',
    });

    expect(repository.create).toHaveBeenCalled();
    expect(result).toEqual({
      _id: 'category-id',
      name: 'pizza',
    });
  });

  it('should reject duplicate category', async () => {
    repository.getOne.mockResolvedValue({
      _id: 'existing',
    });

    await expect(
      service.create({
        name: 'pizza',
        slug: 'pizza',
        logo: '',
        folderId: '',
      }),
    ).rejects.toThrow(ConflictException);
  });
});