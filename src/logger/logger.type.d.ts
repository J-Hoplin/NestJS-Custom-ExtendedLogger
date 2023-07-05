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
    applicationName: string;
    logfileDirectory: string;
    saveAsFile: boolean;
    levelNTimestamp?: ConsoleLoggerOptions;
  };

  type LoggerReturn = {
    message: string;
    saveAsFile: boolean;
  };

  type loggerForRootParam =
    | LoggerConfig
    | Omit<LoggerConfig, 'saveAsFile' | 'logfileDirectory'>;
}
