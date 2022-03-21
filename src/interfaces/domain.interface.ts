import { RequestType } from '../enums/RequestType';

export interface DomainInterface {
  url?: string;
  processedUrl?: string;
  type?: RequestType;
}
