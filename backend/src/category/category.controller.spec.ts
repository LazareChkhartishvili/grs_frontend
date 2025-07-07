import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from '../schemas/category.schema';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    findAllWithFullStructure: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('findAllWithFullStructure', () => {
    it('should return an array of categories with full structure', async () => {
      const mockCategories = [
        {
          _id: '1',
          name: 'Category 1',
          subcategories: [
            {
              _id: 'sub1',
              name: 'Subcategory 1',
              sets: [
                {
                  _id: 'set1',
                  name: 'Set 1',
                  videos: [
                    {
                      _id: 'video1',
                      title: 'Video 1',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      mockCategoryService.findAllWithFullStructure.mockResolvedValue(mockCategories);

      const result = await controller.findAllWithFullStructure();

      expect(service.findAllWithFullStructure).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });

    it('should handle errors when fetching full structure', async () => {
      const errorMessage = 'Failed to fetch categories';
      mockCategoryService.findAllWithFullStructure.mockRejectedValue(new Error(errorMessage));

      await expect(controller.findAllWithFullStructure()).rejects.toThrow(errorMessage);
    });
  });
}); 