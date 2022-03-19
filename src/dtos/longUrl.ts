import { IsIn, IsString, IsUrl } from 'class-validator';
import { RequestType } from '../enums/RequestType';

export class LongUrl {
  @IsString()
  @IsUrl()
  public url: string;

  @IsIn([RequestType.SHORT, RequestType.LONG])
  public requestType: string = RequestType.LONG;
}
