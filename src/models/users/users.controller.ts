import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CheckPolicies, PoliciesGuard } from 'src/auth/guards/policies.guard';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { CreateUserDto } from './dtos/create-user.dto';
import { Action, User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
