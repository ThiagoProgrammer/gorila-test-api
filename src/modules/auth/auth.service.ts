import { UserDto } from './../users/dto/user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: UserDto) {
    const userExist: any = await this.userService.findOneByEmail(user.email);
    if (!userExist) {
      return false;
    }

    const match = await this.comparePassword(user.password, userExist.password);

    return match ? userExist : false;
  }

  public async login(user: UserDto) {
    const userValid = await this.validateUser(user);
    userValid.password = undefined;
    if (!userValid) return { error: 'Usuario ou senha Invalida!' };
    const token = await this.generateToken(userValid);

    return { user: userValid, token };
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);
    const resp = await this.userService.create({ ...user, password: pass });
    const newUser = resp['dataValues'];
    newUser.password = undefined;
    const token = await this.generateToken(newUser);

    return { user: newUser, token };
  }

  private async generateToken(user: UserDto) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
