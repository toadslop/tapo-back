import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateUserDto } from './dtos/create-user.dto';
import { Action, User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() { user }): Promise<User[]> {
    const ability = this.caslAbilityFactory.createForUser(user as User);
    if (ability.can(Action.Read, User)) {
      return this.userService.findAll();
    } else {
      throw new ForbiddenException();
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
