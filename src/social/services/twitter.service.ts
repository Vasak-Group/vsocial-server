import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialNetworkManager } from 'src/social/entities/social-network.abstract';
import { SocialNetwork } from '../enums/social-network.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TwitterService implements SocialNetworkManager {
  baseUrl: string = 'https://api.x.com/2/';
  scopes: string[] = ['tweet.write', 'users.read', 'offline.access'];
  network: SocialNetwork = SocialNetwork.TWITTER;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async auth(user: User): Promise<string> {
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${this.configService.get('xClientId')}&redirect_uri=${this.generateCallbackUrl(user)}&scope=${this.scopes.join(',')}&state=${this.configService.get('xState')}`;
  }

  private generateCallbackUrl(user: User): string {
    return `${this.configService.get('serviceURL')}/auth/${this.network}/${user.email}`;
  }
}
