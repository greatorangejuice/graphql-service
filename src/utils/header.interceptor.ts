import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { log } from 'util';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//   //   console.log('Before...');
//   //   console.log(context);
//   //   console.log(next);
//   //   const now = Date.now();
//   //   return next
//   //     .handle()
//   //     .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
//   // }
// }

// @Injectable()
// export class TransformHeadersInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     call$: Observable<any>,
//   ): Observable<any> {
//     // Get request headers, e.g.
//     const userAgent = context.switchToHttp().getRequest().headers['user-agent'];
//
//     // Not sure if headers are writeable like this, give it a try
//     context.switchToHttp().getResponse().headers['x-api-key'] = 'pretty secure';
//
//     return call$;
//   }
// }

// export class HeaderInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const response: Response = context.switchToHttp().getResponse();
//     // response.setHeader('Authorization', process.env.AUTH_TOKEN);
//     console.log(response);
//     response['token'] = process.env.AUTH_TOKEN;
//     return next.handle();
//   }
// }
