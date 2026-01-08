import { IsString } from 'class-validator';

export class ILanguage {
  @IsString({ message: 'Language is not valid.' })
  language: string;

  @IsString({ message: 'Content is not valid.' })
  content: string;
}
