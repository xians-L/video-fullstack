import { Controller, Post, Body, Get, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator'


@Controller('auth')
@ApiTags('用户')
export class AuthController {
  
  constructor(
    private JwtService: JwtService,
    @InjectModel(User) private userModule:ModelType<User>
  ){}

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    const { username, password} = dto
    const isLogin = await this.userModule.findOne({username})
    if (isLogin) {
      throw new BadRequestException('用户名已存在')
    }
    const user =  await this.userModule.create({
      username,
      password
    })
    return user
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto:LoginDto, @Req() req) {
    return {
      token: this.JwtService.sign(String(req.user._id))
    }
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@Req() req) {
    return req.user
  }
}
