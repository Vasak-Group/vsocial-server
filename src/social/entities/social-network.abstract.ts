import { User } from "src/user/entities/user.entity";

export abstract class SocialNetworkManager {
  abstract auth(user: User): Promise<string>;
}