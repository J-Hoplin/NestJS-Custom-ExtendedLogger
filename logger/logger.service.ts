import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import { saveLog2File, init } from './decorator/save.decorator';
import { LogLevel } from '@nestjs/common';
import { LogfileDirectoryNotGiven } from './exception/LogFileDirectoryNotGiven.exception';
import { LoggerNotConfigured } from './exception/LoggerNotConfigured.exception';

const DEFAULT_LOG_LEVELS: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
];

@Injectable()
export class Logger extends ConsoleLogger implements Logs {
  private static loggerInstance: Logger;
  // private static logLimit: LogLevel[] = DEFAULT_LOG_LEVELS;
  private static saveAsFile: boolean;

  private constructor(
    contextName: string,
    levelNTimestamp?: ConsoleLoggerOptions | undefined,
  ) {
    if (levelNTimestamp) {
      super(contextName, levelNTimestamp);
    } else {
      super(contextName);
    }
  }

  public static getLogger(config?: loggerForRootParam) {
    if (!config) {
      if (!this.loggerInstance) {
        throw new LoggerNotConfigured();
      }
      return Logger.loggerInstance;
    }
    const { applicationName, levelNTimestamp } = config;
    let saveAsFileOption: boolean;
    let logfileDirectory: string;
    if ('saveAsFile' in config) {
      saveAsFileOption = config.saveAsFile;
      logfileDirectory = config.logfileDirectory;

      if (!logfileDirectory) {
        throw new LogfileDirectoryNotGiven();
      }
      Logger.saveAsFile = saveAsFileOption;
      if (Logger.saveAsFile) {
        init(logfileDirectory);
      }
      Logger.loggerInstance = new Logger(applicationName, levelNTimestamp);
    } else {
      Logger.saveAsFile = false;
      Logger.loggerInstance = new Logger(applicationName, levelNTimestamp);
    }
    return Logger.loggerInstance;
  }

  /**
   * Reference : https://github.com/nestjs/nest/blob/master/packages/common/services/console-logger.service.ts
   */
  private returnGetConsolePrintString(
    message: unknown,
    context = '',
    logLevel: LogLevels = 'log',
  ): string {
    const pidMessage = this.formatPid(process.pid);
    const contextMessage = this.formatContext(context);
    const timestampDiff = this.updateAndGetTimestampDiff();
    const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ');
    const formattedMessage = this.formatMessage(
      logLevel,
      message,
      pidMessage,
      formattedLogLevel,
      contextMessage,
      timestampDiff,
    );
    return formattedMessage;
  }

  /**
   *
   * @param message
   * @param context
   */
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  @saveLog2File
  log(message: unknown, context?: unknown, ...rest: unknown[]): LoggerReturn {
    super.log.call(this, message);
    const msg = this.returnGetConsolePrintString(
      message,
      context as string,
      'log',
    );
    return {
      message: msg,
      saveAsFile: Logger.saveAsFile,
    };
  }

  /**
   *
   * @param message
   * @param stackOrContext
   */
  error(message: any, stackOrContext?: string): void;
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  @saveLog2File
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): LoggerReturn {
    super.error.call(this, message);
    const msg = this.returnGetConsolePrintString(
      message,
      context as string,
      'error',
    );
    return {
      message: msg,
      saveAsFile: Logger.saveAsFile,
    };
  }

  /**
   *
   * @param message
   * @param context
   */
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  @saveLog2File
  warn(message: unknown, context?: unknown, ...rest: unknown[]): LoggerReturn {
    super.warn.call(this, message);
    const msg = this.returnGetConsolePrintString(
      message,
      context as string,
      'warn',
    );
    return {
      message: msg,
      saveAsFile: Logger.saveAsFile,
    };
  }

  /**
   *
   * @param message
   * @param context
   */
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  @saveLog2File
  debug(message: unknown, context?: unknown, ...rest: unknown[]): LoggerReturn {
    super.debug.call(this, message);
    const msg = this.returnGetConsolePrintString(
      message,
      context as string,
      'debug',
    );
    return {
      message: msg,
      saveAsFile: Logger.saveAsFile,
    };
  }
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  @saveLog2File
  verbose(
    message: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): LoggerReturn {
    super.verbose.call(this, message);
    const msg = this.returnGetConsolePrintString(
      message,
      context as string,
      'verbose',
    );
    return {
      message: msg,
      saveAsFile: Logger.saveAsFile,
    };
  }
}
