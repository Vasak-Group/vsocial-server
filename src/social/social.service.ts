import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterService } from './services/twitter.service';
import { SocialNetwork } from './enums/social-network.enum';
import { SocialNetworkManager } from './entities/social-network.abstract';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SocialService {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly configService: ConfigService,
  ) {}

  private getSocialNetworkManager(
    network: SocialNetwork,
  ): SocialNetworkManager {
    switch (network) {
      case SocialNetwork.TWITTER:
        return this.twitterService;
      default:
        return null;
    }
  }

  async auth(network: SocialNetwork, user: User): Promise<string> {
    const socialNetwork = this.getSocialNetworkManager(network);
    return socialNetwork.auth(user);
  }
}
