import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublishedBy {
  @Field()
  _id: string;

  @Field()
  name: string;
}
