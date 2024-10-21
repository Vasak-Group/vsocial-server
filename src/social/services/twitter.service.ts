import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialNetworkManager } from 'src/social/entities/social-network.abstract';

@Injectable()
export class TwitterService implements SocialNetworkManager {
  constructor(private readonly configService: ConfigService) {}

  async auth(user: any): Promise<any> {
    return null;
  }
}
