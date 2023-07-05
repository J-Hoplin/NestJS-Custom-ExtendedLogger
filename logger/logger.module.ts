import { DynamicModule, Module } from '@nestjs/common';
import { Logger } from './logger.service';
import { log } from 'console';

@Module({})
export class LoggerModule {
  public static forRoot(loggerOption: LoggerConfig): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          useFactory: () => {
            return Logger.getInstance(loggerOption);
          },
          provide: Logger,
        },
      ],
      exports: [Logger],
    };
  }
  public static forFeature(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          useFactory: () => {
            return Logger.getInstance();
          },
          provide: Logger,
        },
      ],
      exports: [Logger],
    };
  }
}
