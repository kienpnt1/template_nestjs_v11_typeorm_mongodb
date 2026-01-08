import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';
import { Readable } from 'stream';

@Injectable()
export class XssSanitizerPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    return this.shouldSkipSanitize(value) ? value : this.sanitize(value);
  }

  private sanitize(value: unknown): unknown {
    if (typeof value === 'string') {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.sanitize(item));
    }

    if (value && typeof value === 'object') {
      return Object.entries(value).reduce(
        (acc, [key, val]) => {
          acc[key] = this.sanitize(val);
          return acc;
        },
        {} as Record<string, unknown>,
      );
    }

    return value;
  }

  private shouldSkipSanitize(value: unknown): boolean {
    return (
      value === null ||
      value === undefined ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      Buffer.isBuffer(value) ||
      value instanceof Date ||
      this.isMulterFile(value) ||
      this.isReadableStream(value)
    );
  }

  private isMulterFile(value: unknown): boolean {
    return !!value && typeof value === 'object' && 'originalname' in value && 'buffer' in value && 'mimetype' in value;
  }

  private isReadableStream(value: unknown): boolean {
    return (
      value instanceof Readable ||
      (!!value &&
        typeof value === 'object' &&
        typeof (value as any).pipe === 'function' &&
        typeof (value as any)._read === 'function')
    );
  }
}
