// NestJS
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  fetchMessage(): string {
    return 'Winter is coming.';
  }
}
