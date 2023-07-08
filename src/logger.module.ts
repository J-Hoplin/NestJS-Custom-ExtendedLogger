import { DynamicModule, Module } from "@nestjs/common";
import { Logger } from "./logger.service";
import { log } from "console";
import { loggerForRootParam } from "./types";

@Module({})
export class LoggerModule {
  public static forRoot(loggerOption: loggerForRootParam): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          useFactory: () => {
            return Logger.getLogger(loggerOption);
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
            return Logger.getLogger();
          },
          provide: Logger,
        },
      ],
      exports: [Logger],
    };
  }
}
