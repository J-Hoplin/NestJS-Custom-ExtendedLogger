import { Injectable } from '@nestjs/common';
import { Logger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private logger: Logger) {}
  getHello(): string {
    this.logger.log('Hello logger');
    return 'log';
  }

  getError(): string {
    this.logger.error('error');
    return 'error';
  }

  getDebug(): string {
    this.logger.debug('debug');
    return 'debug';
  }

  getWarn(): string {
    this.logger.warn('warn');
    return 'warn';
  }

  getVerbose(): string {
    this.logger.verbose('verbose');
    return 'verbose';
  }
}
