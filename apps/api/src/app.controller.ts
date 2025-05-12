// NestJS
import { Controller, Get } from '@nestjs/common';

// Service
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  fetchMessage(): string {
    return this.appService.fetchMessage();
  }
}
