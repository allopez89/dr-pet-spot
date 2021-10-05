import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from 'src/models/user.model';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserInput } from 'src/dtos/users/create-user.input';
import { SignInInput } from 'src/dtos/users/sign-in.input';

@Injectable()
export class UserService {
  private static readonly _unauthorizedTxt: string =
    'Invalid credentials. Please, check and try again.';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async findById(_id: string): Promise<User> {
    const user: User | null = await this.userRepo.findOne({ _id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createUser(user: CreateUserInput): Promise<User> {
    user.password = await this.hashPassword(user.password);

    return (await this.userRepo.create(user)) as UserDocument;
  }

  async getUserIdByToken(token: string): Promise<any> {
    const userId = await this.jwtService.verify(token, {
      secret: String(process.env['JWT_SECRET']),
    });

    return userId;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ email }, {}, '+password');
  }

  async signIn({ email, password }: SignInInput): Promise<User> {
    const user: User | null = await this.getUserByEmail(email);

    if (!user) throw new UnauthorizedException(UserService._unauthorizedTxt);

    const isPasswordRight: boolean = await this.isPasswordRight(user, password);

    if (!isPasswordRight)
      throw new UnauthorizedException(UserService._unauthorizedTxt);

    return user;
  }

  private setupOptions(): void {
    const options: any = { httpOnly: true };

    if (process.env['NODE_ENV'] === 'production') options.secure = true;
  }

  private getToken({ email, _id, name }: UserDocument): string {
    return this.jwtService.sign({ _id, name, email });
  }

  sendTokenResponse(user: UserDocument, operation: 'sign up' | 'sign in') {
    const token: string = this.getToken(user);

    this.setupOptions();

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return {
      success: true,
      user: userObj,
      message: `${
        operation === 'sign up' ? 'Signed up' : 'Signed in'
      } successfully!`,
      token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt: any = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private async isPasswordRight(
    user: User,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
