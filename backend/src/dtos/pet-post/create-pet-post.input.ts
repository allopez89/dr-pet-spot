import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { IsNotEmpty } from 'src/decorators/is-not-empty.decorator';

@InputType()
export class CreatePetPostInput {
  @IsNotEmpty()
  @Field()
  @IsDefined({ message: "The 'name' field is required." })
  readonly name: string;

  @Field()
  readonly age: string;

  @IsNotEmpty()
  @IsDefined({ message: "The 'description' field is required." })
  @Field()
  readonly description: string;

  @IsNotEmpty()
  @IsDefined({ message: "The 'last seen' field is required." })
  @Field()
  readonly lastSeenAt: string;

  @IsNotEmpty()
  @IsDefined({ message: "The 'image' field is required." })
  @Field()
  readonly image: string;

  @Field()
  readonly reward: string;
}
