import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const tenant = request.tenant;
    const { method, route, params, body, query } = request;
    const action = this.mapMethodToAction(method);

    if (action === 'VIEW') {
      return next.handle();
    }
    return next.handle().pipe(
      tap(async (response) => {
        const log: any = {};
        log.actorId = user?.id || null;
        log.action = action;
        log.entity = route?.path || null;
        log.entityId = params?.id || null;
        log.detail = { body, response, query, params };
        Logger.log(JSON.stringify(log));
      }),
    );
  }

  private mapMethodToAction(method: string): string {
    switch (method) {
      case 'POST':
        return 'CREATE';
      case 'PUT':
      case 'PATCH':
        return 'UPDATE';
      case 'DELETE':
        return 'DELETE';
      case 'GET':
        return 'VIEW';
      default:
        return method;
    }
  }
}
