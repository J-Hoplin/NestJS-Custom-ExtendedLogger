import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      contextName: AppService.name,
      logfileDirectory: `${__dirname}/../`,
      levelNTimestamp: {
        logLevels: ['log'],
        timestamp: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
