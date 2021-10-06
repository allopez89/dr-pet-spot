import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from 'src/resolvers/user/user.resolver';
import { UserSchema } from '../models/user.model';
import { JwtStrategy } from '../guards/jwt-strategy.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100d' },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver, UserRepository, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
