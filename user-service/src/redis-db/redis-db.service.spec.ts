import { Test, TestingModule } from '@nestjs/testing';
import { RedisDbService } from './redis-db.service';

describe('RedisDbService', () => {
  let service: RedisDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisDbService],
    }).compile();

    service = module.get<RedisDbService>(RedisDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
