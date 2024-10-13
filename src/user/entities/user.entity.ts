import { SocialAccount } from 'src/social/entities/social-account.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user)
  accounts: SocialAccount[];
}
