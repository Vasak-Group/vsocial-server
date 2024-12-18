import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SocialAccount } from 'src/social/entities/social-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SocialAccount])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
