import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @UseGuards(AuthGuard)
  @Get('/')
  getUsers() {
    return this.usersService.findAll();
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOne('' + id);
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
