import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    let user = null;
    try {
      user = await this.userService.findOneById(payload.id);
    } catch (error) {
      throw new UnauthorizedException();
    } finally {
      if (!user) {
        throw new UnauthorizedException(
          'Você não tem permissão para acessar este recurso',
        );
      }
    }

    return payload;
  }
}
