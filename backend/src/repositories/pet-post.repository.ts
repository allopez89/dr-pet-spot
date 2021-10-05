import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PetPost, PetPostDocument } from 'src/models/pet-post.model';
import { EntityRepository } from './entity.repository';

@Injectable()
export class PetPostRepository extends EntityRepository<PetPostDocument> {
  constructor(@InjectModel(PetPost.name) readonly PetPostModel: Model<PetPostDocument>) {
    super(PetPostModel);
  }
}
