import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 'Mary', description: 'required name / not uniq / string'})
  readonly name: string;
  @ApiProperty({example: 'mary.bogdanova79@gmail.com', description: 'uniq and require email / string'})
  readonly email: string;
  @ApiProperty({example: 'mary123qwePass', description: 'not uniq / string'})
  readonly password: string;
  @ApiProperty({example: 'MaryBog', description: 'uniq nickname and required / string'})
  readonly nickname: string;
}
