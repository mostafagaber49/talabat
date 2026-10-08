import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { BrandService } from './brand.service';

import { BrandRepository } from 'src/models/brand/brand.repository';
import { CategoryRepository } from 'src/models/category/category.repository';

describe('BrandService', () => {
  let service: BrandService;

  const brandRepository = {
    getOne: jest.fn(),
    create: jest.fn(),
  };

  const categoryRepository = {
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          BrandService,
          {
            provide: BrandRepository,
            useValue: brandRepository,
          },
          {
            provide: CategoryRepository,
            useValue: categoryRepository,
          },
        ],
      }).compile();

    service =
      module.get<BrandService>(BrandService);
  });

  it('should reject duplicate brand', async () => {
    brandRepository.getOne.mockResolvedValue({
      _id: 'existing',
    });

    await expect(
      service.create({
        name: 'brand',
        slug: 'brand',
        logo: '',
        folderId: '',
        categoryIds: [],
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should reject missing categories', async () => {
    brandRepository.getOne.mockResolvedValue(null);

    categoryRepository.getAll.mockResolvedValue([]);

    await expect(
      service.create({
        name: 'brand',
        slug: 'brand',
        logo: '',
        folderId: '',
        categoryIds: [
          '66c123456789abcdef123456',
        ] as any,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create brand', async () => {
    brandRepository.getOne.mockResolvedValue(null);

    categoryRepository.getAll.mockResolvedValue([
      {},
    ]);

    brandRepository.create.mockResolvedValue({
      _id: 'brand-id',
    });

    const result = await service.create({
      name: 'brand',
      slug: 'brand',
      logo: '',
      folderId: '',
      categoryIds: [
        '66c123456789abcdef123456',
      ] as any,
    });

    expect(brandRepository.create).toHaveBeenCalled();
    expect(result).toEqual({
      _id: 'brand-id',
    });
  });
});