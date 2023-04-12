import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto, UserViewType } from './dto/login-user.dto';
import { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserInReq } from './decorators/users.decorator';
import { UserReqDto } from './dto/user-req.dto';
import { GoogleAuthGuard } from './oauth2/google/google-auth.guard';

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

  @ApiOperation({ summary: 'Generate new pair of access and refresh tokens' })
  @ApiResponse({
    status: 200,
    description:
      'Returns JWT accessToken (expired after 5 minutes) in body and JWT refreshToken in cookie (http-only, secure) (expired after 24 hours).',
  })
  @ApiResponse({
    status: 401,
    description:
      'If the JWT refreshToken inside cookie is missing, expired or incorrect',
  })
  @Post('/refresh-token')
  @HttpCode(200)
  async updateToken(
    @Cookies() cookies,
    @Res({ passthrough: true }) response: Response,
  ) {
    const updateToken = await this.authService.updateToken(
      cookies.refreshToken,
    );

    response.cookie('refreshToken', updateToken.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: updateToken.accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get information about current user' })
  @ApiResponse({ status: 200, type: UserViewType })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get('/me')
  @HttpCode(200)
  async checkCurrentUser(@UserInReq() user: UserReqDto) {
    return this.authService.checkCurrentUser(user.userId);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }
}
