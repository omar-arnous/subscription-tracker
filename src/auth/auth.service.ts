import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    let user = await this.usersService.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(createUserDto.password, salt);

    user = await this.usersService.create(createUserDto, hashed);

    const secret = this.configService.get<string>('JWT_SECRET', 'secret');
    const expiresIn = this.configService.get<jwt.SignOptions['expiresIn']>(
      'JWT_EXPIRES_IN',
      '1h',
    );

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn });

    return { user, token };
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const secret = this.configService.get<string>('JWT_SECRET', 'secret');
    const expiresIn = this.configService.get<jwt.SignOptions['expiresIn']>(
      'JWT_EXPIRES_IN',
      '1h',
    );

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn });

    return { user, token };
  }
}
