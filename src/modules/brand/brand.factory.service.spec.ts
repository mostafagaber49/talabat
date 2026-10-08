import { Test } from '@nestjs/testing';
import { BrandFactoryService } from './brand.factory.service';

describe('BrandFactoryService', () => {
  let service: BrandFactoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BrandFactoryService],
    }).compile();

    service =
      module.get<BrandFactoryService>(
        BrandFactoryService,
      );
  });

  it('should create normalized brand', () => {
    const result = service.CreateBrand({
      name: ' McDonalds ',
      logo: '',
      folderId: '',
      categoryIds: [
        '66c123456789abcdef123456',
      ],
    });

    expect(result.name).toBe('mcdonalds');
    expect(result.slug).toBe('mcdonalds');
    expect(result.categoryIds).toHaveLength(1);
  });
});