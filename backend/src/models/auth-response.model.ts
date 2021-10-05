import { Field, ObjectType } from '@nestjs/graphql';
import { User, UserDocument } from './user.model';

@ObjectType()
export class AuthResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => User)
  user: UserDocument;

  @Field()
  message: string;

  @Field()
  token: string;
}
