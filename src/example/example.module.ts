import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule.forFeature()],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
