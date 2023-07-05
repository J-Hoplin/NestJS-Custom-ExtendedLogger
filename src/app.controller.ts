import { Controller, Get, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/log')
  log(): string {
    return this.appService.getHello();
  }

  @Get('/error')
  error(): string {
    return this.appService.getError();
  }

  @Get('/debug')
  debug(): string {
    return this.appService.getDebug();
  }

  @Get('/warn')
  warn(): string {
    return this.appService.getWarn();
  }
  @Get('/verbose')
  verbose(): string {
    return this.appService.getVerbose();
  }
}
