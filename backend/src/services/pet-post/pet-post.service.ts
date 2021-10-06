import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PetPostRepository } from '../../repositories/pet-post.repository';
import { PetPost, PetPostDocument } from '../../models/pet-post.model';
import { CreatePetPostInput } from 'src/dtos/pet-post/create-pet-post.input';
import { UpdatePetPostInput } from '../../dtos/pet-post/update-pet-post.input copy';
import { User, UserDocument } from 'src/models/user.model';

@Injectable()
export class PetPostService {
  constructor(private readonly petPostRepo: PetPostRepository) {}

  async findById(_id: string): Promise<PetPostDocument> {
    const petPost: PetPostDocument | null = await this.petPostRepo.findOne({
      _id,
    });

    if (!petPost) throw new NotFoundException('Pet post not found.');

    return petPost;
  }

  private async isPetPostFromUser(
    petPostId: string,
    userId: string,
  ): Promise<boolean> {
    const petPost: PetPostDocument | null = await this.petPostRepo.findOne({
      _id: petPostId,
      'publisher._id': userId,
    });

    return Boolean(petPost);
  }

  async validatePostMutation(petPostId: string, userId: string): Promise<void> {
    const isPostFromUser: boolean = await this.isPetPostFromUser(
      petPostId,
      userId,
    );

    if (!isPostFromUser)
      throw new UnauthorizedException(
        'This resource is not available for you.',
      );
  }

  async findAll(): Promise<PetPostDocument[]> {
    return await this.petPostRepo.find({});
  }

  async create(
    createPetPostInput: CreatePetPostInput,
    user: User,
  ): Promise<PetPostDocument | null> {
    const petPost: PetPost = {
      ...createPetPostInput,
      publisher: {
        _id: user._id,
        name: user.name,
      },
    } as PetPost;

    return await this.petPostRepo.create(petPost);
  }

  async updateOne({
    _id,
    ...petPost
  }: UpdatePetPostInput): Promise<PetPostDocument> {
    return await this.petPostRepo.findOneAndUpdate({ _id }, petPost);
  }

  async deleteOne(_id: string): Promise<boolean> {
    return await this.petPostRepo.deleteOne({ _id });
  }

  async linkPetPostWithUser(
    petPost: PetPostDocument,
    user: UserDocument,
  ): Promise<void> {
    user.petPosts.push(petPost._id);

    await user.save();
  }
}
