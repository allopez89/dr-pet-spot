import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PetPostDocument } from './pet-post.model';

const { ObjectId } = Types;

export type UserDocument = User & Document;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  _id: string;

  @Prop({ required: [true, 'The first name is required.'] })
  @Field()
  name: string;

  @Field()
  @Prop({ required: [true, 'The last name is required.'] })
  lastName: string;

  @Field()
  @Prop({
    required: [true, 'The email is required.'],
    unique: true,
    trim: true,
  })
  email: string;

  @Field()
  @Prop({
    required: [true, 'The email is required.'],
    trim: true,
    select: false,
  })
  password: string;

  @Field(() => [String])
  @Prop([{ type: ObjectId, ref: 'PetPost' }])
  petPosts: Array<PetPostDocument['_id']>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
