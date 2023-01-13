import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({example: '1', description: 'foreign key'})
  readonly authorId: number;
  @ApiProperty({example: 'NodeJS', description: 'required name / not uniq / string'})
  readonly title: string;
}
