import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { Logger } from './logger.service';
import { tap } from 'rxjs';

@Injectable()
export class FlowInterceptor implements NestInterceptor {
  private readonly logger = Logger.getLogger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const statusCode = res.statusCode;
        const reqURL = req.url;
        const reqMethod = req.method;
        const reqresFlowMessage = `${reqMethod} ${reqURL} - ${statusCode}`;
        if (statusCode >= 200 && statusCode < 400) {
          this.logger.log(reqresFlowMessage);
        } else if (statusCode >= 400 && statusCode < 500) {
          this.logger.warn(reqresFlowMessage);
        } else {
          this.logger.error(reqresFlowMessage);
        }
      }),
    );
  }
}
