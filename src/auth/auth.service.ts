import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

import { CreateUserDTO, LoginUserDTO } from './dto';
import { User } from './interface';

@Injectable({})
export class AuthService {

  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(res, user: CreateUserDTO): Promise<User> {
    try {
      const checkUsername = await this.userModel.findOne({ username: user.username });
      if (checkUsername) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          SUCCESS: false,
          message: 'Nickname already registered',
          data: null
        })
      } 

      const checkUserEmail = await this.userModel.findOne({ email: user.email });
      if (checkUserEmail) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          SUCCESS: false,
          message: 'Email already registered',
          data: null
        })
      }

      user.password = hashSync(user.password, 10);
      const createdUser = await this.userModel.create(user);
      return res.status(HttpStatus.OK).json({
        SUCCESS: true,
        message: 'Registered',
        data: null
      })

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        SUCCESS: false, 
        message: 'INTERNAL_SERVER_ERROR',
        data: null
      })
    }
  }


  async loginUser(res, user: LoginUserDTO): Promise<User> {
    try {
      const logedUser = await this.userModel.findOne({ email: user.email });

      if (logedUser) {
        const pass = compareSync(user.password, logedUser.password);
        if (pass) {
          const payload = {
            id: logedUser._id,
            email: logedUser.email,
          }
          return res.status(HttpStatus.OK).json({
            SUCCESS: true,
            message: 'Logged in',
            data: {
              username: logedUser.username,
              email: logedUser.email,
              accessToken: this.jwtService.sign(payload)
            }
          })
        }
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        SUCCESS: false,
        message: 'Wrong email or password',
        data: null
      })

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        SUCCESS: false, 
        message: 'INTERNAL_SERVER_ERROR',
        data: null
      })
    }
  }

}



