import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@ApiTags('Authorization')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({
    status: 201,
    description:
      'Returns JWT accessToken (expired after 5 minutes) in body and JWT refreshToken in cookie (http-only, secure) (expired after 24 hours).',
  })
  @ApiResponse({
    status: 400,
    description: 'If the inputModel has incorrect values',
  })
  @ApiResponse({
    status: 401,
    description: 'If the password or login is wrong',
  })
  @Post('/registration')
  @HttpCode(201)
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: CreateUserDto,
  ) {
    const jwtPair = await this.authService.registration(userDto);
    response.cookie('refreshToken', jwtPair.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: jwtPair.accessToken };
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description:
      'Returns JWT accessToken (expired after 5 minutes) in body and JWT refreshToken in cookie (http-only, secure) (expired after 24 hours).',
  })
  @ApiResponse({
    status: 400,
    description: 'If the inputModel has incorrect values',
  })
  @ApiResponse({
    status: 401,
    description: 'If the password or login is wrong',
  })
  @Post('/login')
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: LoginUserDto,
  ) {
    const jwtPair = await this.authService.login(userDto);
    response.cookie('refreshToken', jwtPair.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: jwtPair.accessToken };
  }
}
