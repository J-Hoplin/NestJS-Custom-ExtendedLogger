import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { ExampleService } from './example/example.service';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      applicationName: 'Logger Test',
      logfileDirectory: `${__dirname}/../`,
      saveAsFile: true,
      levelNTimestamp: {
        logLevels: ['verbose'],
        timestamp: true,
      },
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExampleService],
})
export class AppModule {}
