import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Mary',
    description: 'required name / not uniq / string',
  })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    example: 'mary.bogdanova79@gmail.com',
    description: 'uniq and require email / string',
  })
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ example: 'mary123qwePass', description: 'not uniq / string' })
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty({
    example: 'MaryBog',
    description: 'uniq nickname and required / string',
  })
  @IsNotEmpty()
  readonly nickname: string;
}
