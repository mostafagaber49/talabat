import { Test } from '@nestjs/testing';
import { CategoryFactoryService } from './category.factory';

describe('CategoryFactoryService', () => {
  let service: CategoryFactoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CategoryFactoryService],
    }).compile();

    service =
      module.get<CategoryFactoryService>(
        CategoryFactoryService,
      );
  });

  it('should normalize category name and create slug', () => {
    const result = service.CreateCategory({
      name: ' Pizza ',
      logo: '',
      folderId: '',
    });

    expect(result.name).toBe('pizza');
    expect(result.slug).toBe('pizza');
  });
});