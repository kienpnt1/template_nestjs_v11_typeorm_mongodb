import { ConstantError } from '@core/constants';
import { BadRequestException } from '@nestjs/common';

export class BaseError extends BadRequestException {
  constructor(options?: { statusCode?: number; message: string; code?: string; dataLog?: any; isLogToFile?: boolean }) {
    super(options.message);

    (this as any).statusCode = options?.statusCode || 400;
    (this as any).code = options?.code;
    (this as any).message = options?.message || ConstantError.REQUEST_ERRORS[400].message;
    (this as any).dataLog = options?.dataLog || ConstantError.SERVER_ERRORS.InternalError;
  }
}
