import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from '../database/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostsService } from './posts.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postsRepository = module.get<MockRepository>(
      getRepositoryToken(PostEntity),
    );
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  describe('findAll', () => {
    describe('if posts exist', () => {
      it('should return posts', async () => {
        const mockedPosts = {};

        postsRepository.find.mockResolvedValue(mockedPosts);

        expect(await postsService.findAll()).toEqual(mockedPosts);
      });
    });
    describe('otherwise', () => {
      describe('if query return undefined', () => {
        it('should throw an error', async () => {
          postsRepository.find.mockResolvedValue(undefined);

          try {
            await postsService.findAll();
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
      describe('if query return empty array', () => {
        it('should throw an error', async () => {
          postsRepository.find.mockResolvedValue([]);

          try {
            await postsService.findAll();
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
    });
  });

  describe('findUsersPosts', () => {
    const userId = '55a1a5be-d03b-48bf-b028-47618cf5b734';

    describe('if posts exist', () => {
      it('should return posts', async () => {
        const mockedPosts = {};

        postsRepository.find.mockResolvedValue(mockedPosts);

        expect(await postsService.findUserPosts(userId)).toEqual(mockedPosts);
      });
    });
    describe('otherwise', () => {
      describe('if query return undefined', () => {
        it('should throw an error', async () => {
          postsRepository.find.mockResolvedValue(undefined);

          try {
            await postsService.findUserPosts(userId);
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
      describe('if query return empty array', () => {
        it('should throw an error', async () => {
          postsRepository.find.mockResolvedValue([]);

          try {
            await postsService.findUserPosts(userId);
          } catch (err) {
            expect(err.message).toEqual('Can not find any data.');
          }
        });
      });
    });
  });

  describe('createPost', () => {
    const createData = {
      title: 'title',
      text: 'Lorem ipsum',
      category: 1,
      imageUrl: 'imageUrl.com/id',
    };

    describe('if created properly', () => {
      it('should return post', async () => {
        const mockedPost = {};

        const postsRepositorySaveSpy = jest
          .spyOn(postsRepository, 'save')
          .mockResolvedValue(mockedPost);

        const postsRepositoryFindSpy = jest
          .spyOn(postsRepository, 'findOne')
          .mockResolvedValue(mockedPost);

        const res = await postsService.createPost(createData);

        expect(postsRepositorySaveSpy).toHaveBeenCalledWith(createData);
        expect(postsRepositoryFindSpy).toHaveBeenCalled();

        expect(res).toEqual(mockedPost);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        postsRepository.save.mockResolvedValue(undefined);

        try {
          await postsService.createPost(createData);
        } catch (err) {
          expect(err.message).toEqual('Can not create post');
        }
      });
    });
  });

  describe('updatePost', () => {
    const editData = {
      id: 1,
      title: 'title',
      text: 'texttext',
    };

    describe('if updated properly', () => {
      it('should return true', async () => {
        const mockedResult: UpdateResult = {
          raw: {},
          affected: 1,
          generatedMaps: [],
        };

        postsRepository.update.mockResolvedValue(mockedResult);

        expect(await postsService.editPost(editData)).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should return an error', async () => {
        const mockedError: UpdateResult = {
          raw: {},
          affected: 0,
          generatedMaps: [],
        };

        postsRepository.update.mockResolvedValue(mockedError);

        try {
          await postsService.editPost(editData);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });

  describe('deletePost', () => {
    describe('if deleted properly', () => {
      it('should return true', async () => {
        const mockedResult: DeleteResult = {
          raw: {},
          affected: 1,
        };

        postsRepository.delete.mockResolvedValue(mockedResult);

        expect(await postsService.deletePost(1)).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        const mockedError: DeleteResult = {
          raw: {},
          affected: 0,
        };

        postsRepository.delete.mockResolvedValue(mockedError);

        try {
          await postsService.deletePost(1);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });

  describe('changeCategoryPost', () => {
    const changeCategoryData = {
      id: 1,
      category: 1,
    };

    describe('if changed properly', () => {
      it('should return post', async () => {
        const mockedPost = {};

        const postsRepositorySaveSpy = jest
          .spyOn(postsRepository, 'save')
          .mockResolvedValue(mockedPost);

        const res = await postsService.changeCategoryPost(changeCategoryData);

        expect(postsRepositorySaveSpy).toHaveBeenCalledWith(changeCategoryData);

        expect(res).toEqual(mockedPost);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        postsRepository.save.mockResolvedValue(undefined);

        try {
          await postsService.changeCategoryPost(changeCategoryData);
        } catch (err) {
          expect(err.message).toEqual('Can not update post');
        }
      });
    });
  });

  describe('deleteUserPosts', () => {
    const userId = '55a1a5be-d03b-48bf-b028-47618cf5b734';

    describe('if deleted properly', () => {
      it('should return true', async () => {
        const mockedResult: DeleteResult = {
          raw: {},
          affected: 1,
        };

        postsRepository.delete.mockResolvedValue(mockedResult);

        expect(await postsService.deleteUserPosts(userId)).toEqual(true);
      });
    });
    describe('otherwise', () => {
      it('should throw an error', async () => {
        const mockedError: DeleteResult = {
          raw: {},
          affected: 0,
        };

        postsRepository.delete.mockResolvedValue(mockedError);

        try {
          await postsService.deleteUserPosts(userId);
        } catch (err) {
          expect(err.message).toEqual('Database/ORM error.');
        }
      });
    });
  });
});
