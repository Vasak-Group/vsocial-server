export abstract class SocialNetworkManager {
  abstract auth(user: any): Promise<any>;
}