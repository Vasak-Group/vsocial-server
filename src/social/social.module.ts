import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TwitterService } from './services/twitter.service';

@Module({
  controllers: [SocialController],
  providers: [SocialService, TwitterService, ConfigService],
})
export class SocialModule {}
