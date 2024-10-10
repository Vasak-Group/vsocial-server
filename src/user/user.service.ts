import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Get user by id
   * @param id {string} User id
   * @returns {Promise<User>} User
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneBy([{ id }]);
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
  /**
   * Returns a user by email
   * @param email {string} User email
   * @returns {Promise<User>} User
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneBy({
        email,
      });
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  /**
   * Returns all users
   * @returns {User[]} Users
   */
  async getUsers(query: object = {}): Promise<User[]> {
    try {
      const users = this.usersRepository.find(query);
      return users;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  /**
   * Creates a new user
   * @param userData {CreateUserDto} User data
   * @returns {User} User
   */
  async createUser(userData: User): Promise<User> {
    try {
      userData.password = await this.hashPassword(userData.password);
      const user = this.usersRepository.create(userData);
      return await user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  /**
   * Hashes a password
   * @param password {string} Password
   * @returns {string} Hashed password
   * @private
   * @async
   * @memberof UserService
   * @method hashPassword
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      parseInt(this.configService.get('saltRounds')),
    );
    return await bcrypt.hash(password, salt);
  }

  /**
   * Updates a user
   * @param id {string} User id
   * @param userData {UpdateUserDto} User data
   * @returns {User} User
   * @memberof UserService
   * @method updateUser
   * @async
   * @public
   */
  async updateUser(id: number, userData: User): Promise<User> {
    try {
      await this.usersRepository.update(id, userData);
      const user = await this.getUserById(id);
      return user;
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }
}
