import { Injectable, NotFoundException } from '@nestjs/common';
import { PetPostRepository } from '../../repositories/pet-post.repository';
import { PetPostDocument } from '../../models/pet-post.model';
import { CreatePetPostInput } from 'src/dtos/pet-post/create-pet-post.input';
import { UpdatePetPostInput } from '../../dtos/pet-post/update-pet-post.input copy';

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

  async findAll(): Promise<PetPostDocument[]> {
    return await this.petPostRepo.find({});
  }

  async create(petPost: CreatePetPostInput): Promise<PetPostDocument | null> {
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
}
