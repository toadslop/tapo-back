import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
