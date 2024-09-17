import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@InjectModel(User) private readonly userModule: ModelType<User>) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userModule.findOne({username}).select("+password");
    if (!user) { 
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
} 
