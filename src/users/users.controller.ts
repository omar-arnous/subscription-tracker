import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Get('/')
  getUsers() {
    return this.usersService.findAll();
  }

  @Version('1')
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOne('' + id);
  }

  @Version('1')
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Version('1')
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return 'DELETE users/' + id;
  }
}
