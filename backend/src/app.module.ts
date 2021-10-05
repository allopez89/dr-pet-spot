import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PetService } from './services/pet/pet.service';
import { PetPostService } from './services/pet-post/pet-post.service';
import { PetPostResolver } from './resolvers/pet-post/pet-post.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, PetService, PetPostService, PetPostResolver],
})
export class AppModule {}
