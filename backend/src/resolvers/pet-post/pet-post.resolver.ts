import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetPostService } from '../../services/pet-post/pet-post.service';
import { PetPost, PetPostDocument } from '../../models/pet-post.model';
import { CreatePetPostInput } from '../../dtos/pet-post/create-pet-post.input';
import { UpdatePetPostInput } from '../../dtos/pet-post/update-pet-post.input copy';
import { User, UserDocument } from '../../models/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { UserService } from '../../services/user/user.service';

@Resolver()
export class PetPostResolver {
  constructor(
    private readonly petPostService: PetPostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [PetPost])
  async findAllPetPosts(): Promise<PetPost[]> {
    return await this.petPostService.findAll();
  }

  @Query(() => PetPost)
  async findPetPostById(@Args('_id') _id: string): Promise<PetPost> {
    return await this.petPostService.findById(_id);
  }

  @Mutation(() => PetPost)
  @UseGuards(AuthGuard)
  async createPetPost(
    @Args('createPetPostInput') createPetPostInput: CreatePetPostInput,
    @Context('user') user: User,
  ): Promise<PetPost | null> {
    const petPost: PetPost | null = await this.petPostService.create(
      createPetPostInput,
      user,
    );

    const userFound: UserDocument = (await this.userService.findById(
      user._id,
    )) as UserDocument;

    await this.petPostService.linkPetPostWithUser(
      petPost as PetPostDocument,
      userFound,
    );

    return petPost;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PetPost)
  async updatePetPost(
    @Args('updatePetPostInput')
    updatePetPostInput: UpdatePetPostInput,
    @Context('user') { _id: userId }: User,
  ): Promise<PetPost> {
    await this.petPostService.validatePostMutation(
      updatePetPostInput._id,
      userId,
    );

    return await this.petPostService.updateOne(updatePetPostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deletePetPost(
    @Args('_id') _id: string,
    @Context('user') { _id: userId }: User,
  ): Promise<boolean> {
    await this.petPostService.validatePostMutation(_id, userId);

    return await this.petPostService.deleteOne(_id);
  }
}
