import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsDefined, MinLength } from 'class-validator';
import { IsNotEmpty } from 'src/decorators/is-not-empty.decorator';
import { IsValidEmail } from 'src/decorators/is-valid-email.decorator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  @IsDefined({ message: "The 'name' field is required." })
  readonly name: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  readonly lastName: string;

  @IsNotEmpty()
  @IsValidEmail({ message: 'Invalid email.' })
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'The password must have at least 6 characters.' })
  @IsDefined({ message: "The 'name' field is required." })
  @Field()
  password: string;
}
