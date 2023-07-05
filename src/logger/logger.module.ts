import { DynamicModule, Module } from '@nestjs/common';
import { Logger } from './logger.service';

@Module({})
export class LoggerModule {
  public static forRoot(loggerOption: LoggerConfig): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          useFactory: () => {
            return new Logger(loggerOption);
          },
          provide: Logger,
        },
      ],
      exports: [Logger],
    };
  }
  public static forFeature(
    loggerOption: Omit<LoggerConfig, 'logfileDirectory' | 'levelNTimestamp'>,
  ): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          useFactory: () => {
            return new Logger(loggerOption);
          },
          provide: Logger,
        },
      ],
    };
  }
}
