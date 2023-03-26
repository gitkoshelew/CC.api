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

export class UserViewType {
  @ApiProperty({ example: '1', description: 'uniq id' })
  id: number;

  @ApiProperty({
    example: 'Mary',
    description: 'required name / not uniq / string',
  })
  name: string;

  @ApiProperty({
    example: 'Bogdanova',
    description: 'not required surname / not uniq / string',
  })
  surname: string;

  @ApiProperty({
    example: 'mary.bogdanova79@gmail.com',
    description: 'uniq and require email / string',
  })
  email: string;

  @ApiProperty({
    example: 'MaryBog',
    description: 'uniq nickname and required / string',
  })
  nickname: string;
}
