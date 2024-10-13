import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SocialNetwork } from '../enums/social-network.enum';

@Entity()
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column()
  socialNetwork: SocialNetwork;

  @Column()
  token: string;
}
