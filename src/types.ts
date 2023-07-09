import { ConsoleLoggerOptions } from '@nestjs/common';

export type loggerfn = (...args: any[]) => any;
export interface Logs {
  log: loggerfn;
  error: loggerfn;
  warn: loggerfn;
  debug: loggerfn;
  verbose: loggerfn;
}
export type LogLevels = keyof Logs;

export interface LoggerConfig {
  applicationName: string;
  levelNTimestamp?: ConsoleLoggerOptions;
}
export interface LoggerConfigSave extends LoggerConfig {
  saveAsFile: boolean;
  logfileDirectory: string;
}

export type LoggerReturn = {
  message: string;
  saveAsFile: boolean;
};

export type loggerForRootParam = LoggerConfig | LoggerConfigSave;
