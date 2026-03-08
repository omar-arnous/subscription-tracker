import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  userId: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();

      const authHeader =
        typeof request.headers.authorization === 'string'
          ? request.headers.authorization
          : undefined;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET', 'secret'),
      ) as JwtPayload;

      const user = await this.usersService.findOne(decoded.userId.toString());

      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }

      request['user'] = user;

      return true;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
