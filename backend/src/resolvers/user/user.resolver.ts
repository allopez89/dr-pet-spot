import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/dtos/users/create-user.input';
import { User } from 'src/models/user.model';
import { UserDocument } from '../../models/user.model';
import { AuthResponse } from '../../models/auth-response.model';
import { SignInInput } from '../../dtos/users/sign-in.input';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('_id') _id: string): Promise<User> {
    return await this.userService.findById(_id);
  }

  @Query(() => User)
  async getCurrentUser(@Args('token') token: string): Promise<User> {
    return await this.userService.getUserIdByToken(token);
  }

  @Mutation(() => AuthResponse)
  async signUp(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    const userFound = await this.userService.getUserByEmail(
      createUserInput.email,
    );

    if (userFound)
      throw new UnauthorizedException('The email provided is already taken.');

    const newUser: User | null = await this.userService.createUser(
      createUserInput,
    );

    return this.userService.sendTokenResponse(
      newUser as UserDocument,
      'sign up',
    );
  }

  @Mutation(() => AuthResponse)
  async signIn(
    @Args('signInInput')
    signInInput: SignInInput,
  ) {
    const user: User = await this.userService.signIn(signInInput);

    return this.userService.sendTokenResponse(user as UserDocument, 'sign in');
  }
}
