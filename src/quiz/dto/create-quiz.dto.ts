import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({example: '{id: 1, name: Mary, nickname: GodFather}', description: 'foreign key'})
  readonly author: string;
  @ApiProperty({example: 'NodeJS', description: 'required name / not uniq / string'})
  readonly title: string;
}

