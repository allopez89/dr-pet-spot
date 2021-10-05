import { Test, TestingModule } from '@nestjs/testing';
import { PetPostResolver } from './pet-post.resolver';

describe('PetPostResolver', () => {
  let resolver: PetPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetPostResolver],
    }).compile();

    resolver = module.get<PetPostResolver>(PetPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
