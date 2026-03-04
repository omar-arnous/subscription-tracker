import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Version('1')
  @Get('/')
  getUsers() {
    return 'GET users/';
  }

  @Version('1')
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return 'GET users/' + id;
  }

  @Version('1')
  @Post('/')
  createUser() {
    return 'POST users/';
  }

  @Version('1')
  @Put('/:id')
  updateUser(@Param('id') id: string) {
    return 'PUT users/' + id;
  }

  @Version('1')
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return 'DELETE users/' + id;
  }
}
