import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = await GqlExecutionContext.create(context).getContext();

    if (!ctx.headers.authorization) return false;

    ctx.user = await this.validateToken(ctx.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    const [bearer, token] = auth.split(' ');

    if (bearer !== 'Bearer')
      throw new ForbiddenException('Forbidden resource.');

    try {
      return jwt.verify(token, String(process.env['JWT_SECRET']));
    } catch (error) {
      throw new ForbiddenException('Forbidden resource.');
    }
  }
}
