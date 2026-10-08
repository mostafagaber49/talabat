import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ProductService } from './product.service';

import { ProductRepository } from 'src/models/product/product.repository';
import { CategoryRepository } from 'src/models/category/category.repository';
import { BrandRepository } from 'src/models/brand/brand.repository';

describe('ProductService', () => {
  let service: ProductService;

  const productRepository = {
    getOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
  };

  const categoryRepository = {
    getOne: jest.fn(),
  };

  const brandRepository = {
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          ProductService,
          {
            provide: ProductRepository,
            useValue: productRepository,
          },
          {
            provide: CategoryRepository,
            useValue: categoryRepository,
          },
          {
            provide: BrandRepository,
            useValue: brandRepository,
          },
        ],
      }).compile();

    service =
      module.get<ProductService>(ProductService);
  });

  it('should increase stock when product exists', async () => {
    productRepository.getOne.mockResolvedValue({
      _id: 'product-id',
    });

    productRepository.updateOne.mockResolvedValue({
      modifiedCount: 1,
    });

    const result = await service.create({
      name: 'Burger',
      stock: 5,
      categoryId: '66c123456789abcdef123456',
      brandId: '66c123456789abcdef123456',
      subImages: [],
      sizes: [],
      colors: [],
      description: 'Burger',
      price: 100,
      discount: 10,
      discountType: 'percentage' as any,
      mainImage: 'image.jpg',
    });

    expect(
      productRepository.updateOne,
    ).toHaveBeenCalled();

    expect(result).toEqual({
      modifiedCount: 1,
    });
  });

  it('should reject missing category', async () => {
    productRepository.getOne.mockResolvedValue(null);

    categoryRepository.getOne.mockResolvedValue(null);

    await expect(
      service.create({
        name: 'Burger',
        stock: 5,
        categoryId: '66c123456789abcdef123456',
        brandId: '66c123456789abcdef123456',
        subImages: [],
        sizes: [],
        colors: [],
        description: 'Burger',
        price: 100,
        discount: 10,
        discountType: 'percentage' as any,
        mainImage: 'image.jpg',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should reject missing brand', async () => {
    productRepository.getOne.mockResolvedValue(null);

    categoryRepository.getOne.mockResolvedValue({
      _id: 'category-id',
    });

    brandRepository.getOne.mockResolvedValue(null);

    await expect(
      service.create({
        name: 'Burger',
        stock: 5,
        categoryId: '66c123456789abcdef123456',
        brandId: '66c123456789abcdef123456',
        subImages: [],
        sizes: [],
        colors: [],
        description: 'Burger',
        price: 100,
        discount: 10,
        discountType: 'percentage' as any,
        mainImage: 'image.jpg',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});