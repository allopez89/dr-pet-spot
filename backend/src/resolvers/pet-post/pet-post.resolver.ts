import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetPostService } from '../../services/pet-post/pet-post.service';
import { PetPost } from '../../models/pet-post.model';
import { CreatePetPostInput } from '../../dtos/pet-post/create-pet-post.input';
import { UpdatePetPostInput } from '../../dtos/pet-post/update-pet-post.input copy';

@Resolver()
export class PetPostResolver {
  constructor(private readonly petPostService: PetPostService) {}

  @Query(() => [PetPost])
  async findAllPetPosts(): Promise<PetPost[]> {
    return await this.petPostService.findAll();
  }

  @Query(() => PetPost)
  async findPetPostById(@Args('_id') _id: string): Promise<PetPost> {
    return await this.petPostService.findById(_id);
  }

  @Mutation(() => PetPost)
  async createPetPost(
    @Args('createPetPostInput') createPetPostInput: CreatePetPostInput,
  ): Promise<PetPost | null> {
    return await this.petPostService.create(createPetPostInput);
  }

  @Mutation(() => PetPost)
  async updatePetPost(
    @Args('updatePetPostInput') updatePetPostInput: UpdatePetPostInput,
  ): Promise<PetPost> {
    return await this.petPostService.updateOne(updatePetPostInput);
  }

  @Mutation(() => PetPost)
  async deletePetPost(_id: string): Promise<boolean> {
    return await this.petPostService.deleteOne(_id);
  }
}
