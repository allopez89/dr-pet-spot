import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type PetPostDocument = PetPost & Document;

@ObjectType()
@Schema({ timestamps: true })
export class PetPost {
  @Field()
  _id: string;

  @Prop({ required: [true, 'The name is required.'] })
  @Field()
  name: string;

  @Prop()
  @Field()
  age: string;

  @Prop({ required: [true, 'The description is required.'] })
  @Field()
  description: string;

  @Prop({ required: [true, 'The last seen at field is required.'] })
  @Field()
  lastSeenAt: string;

  @Prop({ required: [true, 'The image field is required.'] })
  @Field()
  image: string;

  @Prop()
  @Field()
  reward: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const PetPostSchema = SchemaFactory.createForClass(PetPost);
