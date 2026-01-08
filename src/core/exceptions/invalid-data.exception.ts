import { BadRequestException } from '@nestjs/common';
import { ConstantError } from './constant.error';

export class InvalidDataException extends BadRequestException {
  constructor(options?: { error?: any; message?: string; name?: string; code?: string }) {
    super(options.message);
    (this as any).name = options?.name || ConstantError.REQUEST_ERRORS[400].name;
    (this as any).message = options?.message || ConstantError.REQUEST_ERRORS[400].message;
    (this as any).code = options?.code || ConstantError.SERVER_ERRORS.InternalError;
  }
}
