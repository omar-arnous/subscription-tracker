import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  findAll() {
    return this.userService.find();
  }

  async findOne(id: string) {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid user ID: ${id}`);
    }

    // const user = await this.userService.findOneBy({ id });
    const user = await this.userService.findOne({ where: { id: parsedId } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto, hashedPassword: string) {
    const existingUser = await this.userService.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userService.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {}
}
