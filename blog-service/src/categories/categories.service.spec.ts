import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../database/entities/category.entity';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoryI } from 'src/models/category.interface';
import { categoryExist } from 'src/validators';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoryRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<MockRepository>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  describe('findAll', () => {
    describe('if categories exist', () => {
      it('should return categories', async () => {
        const mockedCategories = {};

        categoryRepository.find.mockResolvedValue(mockedCategories);

        expect(await categoriesService.findAll()).toEqual(mockedCategories);
      });
    });
    describe('otherwise', () => {
      describe('if query return undefined', () => {
        it('should throw an error', async () => {
          categoryRepository.find.mockResolvedValue(undefined);

          try {
            await categoriesService.findAll();
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
      describe('if query return empty array', () => {
        it('should throw an error', async () => {
          categoryRepository.find.mockResolvedValue([]);

          try {
            await categoriesService.findAll();
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
    });
  });

  describe('findOneById', () => {
    describe('when category exists', () => {
      it('should return category', async () => {
        const mockedCat = {};

        categoryRepository.findOne.mockResolvedValue(mockedCat);

        const cat = await categoriesService.findOneById(1);

        expect(cat).toEqual(mockedCat);
      });
    });
    describe('otherwise', () => {
      it('should return an error', async () => {
        const id = 1;
        categoryRepository.findOne.mockResolvedValue(undefined);

        try {
          await categoriesService.findOneById(id);
        } catch (err) {
          expect(err.message).toEqual(`Can not find category with id: ${id}`);
        }
      });
    });
  });

  describe('findOneByName', () => {
    describe('if category exists', () => {
      it('should return category', async () => {
        const mockedCat = {};

        categoryRepository.findOne.mockResolvedValue(mockedCat);

        const cat = await categoriesService.findOneByName('name');

        expect(cat).toEqual(mockedCat);
      });
    });
    describe('otherwise', () => {
      it('should return an error', async () => {
        const name = 'categoryName';
        categoryRepository.findOne.mockResolvedValue(undefined);

        try {
          await categoriesService.findOneByName(name);
        } catch (err) {
          expect(err.message).toEqual(
            `Can not find category with name: ${name}`,
          );
        }
      });
    });
  });

  describe('createCategory', () => {
    const createData = {
      name: 'name',
    };

    describe('if created properly', () => {
      it('should return category', async () => {
        const mockedCategory = {};

        const categoryRepositorySaveSpy = jest
          .spyOn(categoryRepository, 'save')
          .mockResolvedValue(mockedCategory);

        const res = await categoriesService.createCategory(createData);

        expect(categoryRepositorySaveSpy).toHaveBeenCalledWith(createData);

        expect(res).toEqual(mockedCategory);
      });
    });

    describe('otherwise', () => {
      it('should throw an error', async () => {
        categoryRepository.save.mockResolvedValue(undefined);

        try {
          await categoriesService.createCategory(createData);
        } catch (err) {
          expect(err.message).toEqual('Can not save in database');
        }
      });
    });
  });

  describe('updateCategory', () => {
    const editData = {
      id: 1,
      name: 'name',
    };

    describe('if updated properly', () => {
      it('should return true', async () => {
        const mockedResult: UpdateResult = {
          raw: {},
          affected: 1,
          generatedMaps: [],
        };

        categoryRepository.update.mockResolvedValue(mockedResult);

        expect(await categoriesService.editCategory(editData)).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should return an error', async () => {
        const mockedError: UpdateResult = {
          raw: {},
          affected: 0,
          generatedMaps: [],
        };

        categoryRepository.update.mockResolvedValue(mockedError);

        try {
          await categoriesService.editCategory(editData);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });

  describe('deleteCategory', () => {
    describe('if deleted properly', () => {
      it('should return true', async () => {
        const mockedResult: DeleteResult = {
          raw: {},
          affected: 1,
        };

        categoryRepository.delete.mockResolvedValue(mockedResult);

        expect(await categoriesService.deleteCategory(1)).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        const mockedError: DeleteResult = {
          raw: {},
          affected: 0,
        };

        categoryRepository.delete.mockResolvedValue(mockedError);

        try {
          await categoriesService.deleteCategory(1);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });
});
