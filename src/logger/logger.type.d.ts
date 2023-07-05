import { ConsoleLoggerOptions } from '@nestjs/common';

export global {
  type loggerfn = (...args: any[]) => any;
  interface Logs {
    log: loggerfn;
    error: loggerfn;
    warn: loggerfn;
    debug: loggerfn;
    verbose: loggerfn;
  }
  type LogLevels = keyof Logs;

  type LoggerConfig = {
    contextName: string;
    logfileDirectory?: string;
    levelNTimestamp?: ConsoleLoggerOptions;
  };
}
