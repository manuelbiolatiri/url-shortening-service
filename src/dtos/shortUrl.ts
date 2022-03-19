import { IsIn, IsString, IsUrl } from 'class-validator';
import { RequestType } from '../enums/RequestType';

export class ShortUrl {
  @IsString()
  @IsUrl()
  public url: string;

  @IsIn([RequestType.SHORT, RequestType.LONG])
  public requestType: string = RequestType.SHORT;
}
