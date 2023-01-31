import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'mary.bogdanova79@gmail.com',
    description: 'uniq and require email / string',
  })
  readonly email: string;
  @ApiProperty({ example: 'mary123qwePass', description: 'not uniq / string' })
  readonly password: string;
}

export type Token = {
  accessToken: string;
};
