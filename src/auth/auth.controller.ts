import { Controller, Post, Res, Body, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO } from './dto';

@Controller('auth')
export class AuthController {

  constructor(private userSrv: AuthService ) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    this.userSrv.createUser(res, createUserDTO);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  loginUser(@Res() res, @Body() loginUserDTO: LoginUserDTO) {
    this.userSrv.loginUser(res, loginUserDTO);
  }

}
