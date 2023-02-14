import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ example: 1, description: 'foreign key' })
  @IsNotEmpty()
  readonly authorId: number;
  @ApiProperty({
    example: 'NodeJS',
    description: 'required name / not uniq / string',
  })
  @IsNotEmpty()
  readonly title: string;
}
