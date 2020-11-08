import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { ChangeRoleDto } from '../auth/dto/change-role.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    const lowercaseEmail = this.authService.lowercaseField(email);

    return this.usersRepository.findOne({ where: { email: lowercaseEmail } });
  }

  async createUser(createData: User): Promise<User> {
    let user = new User();

    user.firstName = createData.firstName;
    user.lastName = createData.lastName;
    user.phoneNumber = createData.phoneNumber;

    user.email = this.authService.lowercaseField(createData.email);
    user.password = this.authService.hashPassword(createData.password);

    await this.usersRepository.save(user);

    return user;
  }

  async updateUser(updateData: User, user: User): Promise<Boolean> {
    const currentData = await this.findOneById(user.id);

    delete currentData.email;
    delete currentData.password;
    delete currentData.role;

    let finalData = Object.assign(currentData, updateData);
    await this.usersRepository.save(finalData);

    return true;
  }

  async deleteUser(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected == 1) {
      return true;
    } else {
      throw new Error('The user has not been deleted.');
    }
  }

  async changeRole(changeRoleData: ChangeRoleDto): Promise<Boolean> {
    const user = await this.findOneById(changeRoleData.id);

    if (!user) return undefined;
    if (user.role == 'root')
      throw new Error('Can not change permissions of root');

    user.role = changeRoleData.role;
    try {
      await this.usersRepository.save(user);
    } catch (err) {
      throw new Error(`Can not change permissions: ${err.message}`);
    }

    return true;
  }

  async changePassword(id: string, password: string): Promise<Boolean> {
    const hashedPassword = this.authService.hashPassword(password);

    await this.usersRepository.update(id, { password: hashedPassword });

    return new Boolean(true);
  }
}
