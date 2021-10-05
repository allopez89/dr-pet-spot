import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { IsNotEmpty } from 'src/decorators/is-not-empty.decorator';
import { IsValidEmail } from 'src/decorators/is-valid-email.decorator';

@InputType()
export class SignInInput {
  @IsNotEmpty()
  @IsValidEmail({ message: 'Invalid email.' })
  @IsDefined({ message: "The 'email' field is required." })
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @IsDefined({ message: "The 'password' field is required." })
  @Field()
  readonly password: string;
}
