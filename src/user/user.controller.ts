import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userService.getUsers();
      return users;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(userData);
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getLoggedUser(@Request() req): Promise<User> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @Request() req,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.updateUser(req.user._id, userData);
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
}
