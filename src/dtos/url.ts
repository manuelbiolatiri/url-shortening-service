import { IsString, IsUrl } from 'class-validator';

export class Url {
  @IsString()
  @IsUrl()
  public url: string;
}
