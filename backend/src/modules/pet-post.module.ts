import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetPostSchema } from 'src/models/pet-post.model';
import { PetPostService } from '../services/pet-post/pet-post.service';
import { PetPostResolver } from '../resolvers/pet-post/pet-post.resolver';
import { PetPostRepository } from '../repositories/pet-post.repository';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'PetPost', schema: PetPostSchema }]),
  ],
  providers: [PetPostService, PetPostRepository, PetPostResolver],
})
export class PetPostModule {}
