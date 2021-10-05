import { Test, TestingModule } from '@nestjs/testing';
import { PetPostService } from './pet-post.service';

describe('PetPostService', () => {
  let service: PetPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetPostService],
    }).compile();

    service = module.get<PetPostService>(PetPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
