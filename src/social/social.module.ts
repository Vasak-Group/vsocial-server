import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TwitterService } from './services/twitter.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SocialController, HttpModule],
  providers: [SocialService, TwitterService, ConfigService],
})
export class SocialModule {}
