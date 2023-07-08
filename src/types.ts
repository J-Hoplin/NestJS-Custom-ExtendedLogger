import { ConsoleLoggerOptions } from "@nestjs/common";

export type loggerfn = (...args: any[]) => any;
export interface Logs {
  log: loggerfn;
  error: loggerfn;
  warn: loggerfn;
  debug: loggerfn;
  verbose: loggerfn;
}
export type LogLevels = keyof Logs;

export type LoggerConfig = {
  applicationName: string;
  logfileDirectory: string;
  saveAsFile: boolean;
  levelNTimestamp?: ConsoleLoggerOptions;
};

export type LoggerReturn = {
  message: string;
  saveAsFile: boolean;
};

export type loggerForRootParam =
  | LoggerConfig
  | Omit<LoggerConfig, "saveAsFile" | "logfileDirectory">;
