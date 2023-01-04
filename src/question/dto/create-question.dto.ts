import { ApiProperty } from '@nestjs/swagger';
import { QuestionDifficulty, QuestionType } from '../question.model';

export class CreateQuestionDto {
  @ApiProperty({example: 'NodeJS question #13', description: 'required title / not uniq / string'})
  readonly title: string;
  @ApiProperty({example: '{"question": "blablabla", "answers": { "wrong" : "bla", "correct" : "blabla"}}', description: 'sample of question at JSON datatype/ required'})
  readonly content: JSON;
  @ApiProperty({example: 'oneChoice / multiChoice', description: 'how many of variables can been chosen for answer / required'})
  readonly type: QuestionType;
  @ApiProperty({example: 'easy / normal / hard', description: 'set your difficulty / required'})
  readonly difficulty: QuestionDifficulty;
  @ApiProperty({example: 'this question can find your weakness at EventLoop', description: 'piece of description for the question / required'})
  readonly description: string;
  @ApiProperty({example: '1', description: 'topic of the question / required'})
  readonly topicId: number;
}
