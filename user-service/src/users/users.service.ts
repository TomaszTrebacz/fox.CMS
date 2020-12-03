import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { ChangeRoleDto } from '../auth/dto/change-role.dto';
import { User } from './entities/user.entity';
import { userRole } from './enums/userRole.enum';

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

    return this.usersRepository.findOne({
      where: { email: lowercaseEmail },
    });
  }

  findOneByPhoneNumber(phoneNumber: string) {
    return this.usersRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
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

    let finalData = Object.assign(currentData, updateData);
    await this.usersRepository.save(finalData);

    return new Boolean(true);
  }

  async deleteUser(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected == 1) {
      return true;
    } else {
      throw new Error('The user has not been deleted.');
    }
  }

  async changePassword(id: string, password: string): Promise<Boolean> {
    const hashedPassword = this.authService.hashPassword(password);

    const changed = await this.usersRepository.update(id, {
      password: hashedPassword,
    });

    if (changed.affected == 1) {
      return new Boolean(true);
    } else {
      throw new Error('The password has not been updated.');
    }
  }
}
