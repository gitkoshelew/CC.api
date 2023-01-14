import { ApiProperty } from '@nestjs/swagger';
import { DifficultyTypes, QuestionTypes } from '../questions.types';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'NodeJS question #13',
    description: 'required title / not uniq / string',
  })
  readonly title: string;
  @ApiProperty({
    example:
      '{"question": "blablabla", "answers": { "wrong" : "bla", "correct" : "blabla"}}',
    description: 'sample of question at JSON datatype/ required',
  })
  readonly content: JSON;
  @ApiProperty({
    example: 'single / multi',
    description: 'how many of variables can been chosen for answer / required',
  })
  readonly type: QuestionTypes;
  @ApiProperty({
    example: 'light / medium / hard',
    description: 'set your difficulty / required',
  })
  readonly difficulty: DifficultyTypes;
  @ApiProperty({
    example: 'this question can find your weakness at EventLoop',
    description: 'piece of description for the question / required',
  })
  readonly description: string;
  @ApiProperty({
    example: '1',
    description: 'topic of the question / required',
  })
  readonly topicId: number;
  @ApiProperty({
    example: '1000',
    description: 'timer in seconds / required',
  })
  timer: number;
}
