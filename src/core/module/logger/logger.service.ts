import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import { ILoggerService, IOptionLog, LevelLog, LogConfig } from './logger.interface';

@Injectable()
export class LoggerService implements ILoggerService {
  private logger: winston.Logger;

  constructor(logConfig: LogConfig) {
    const logFormat = winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
    );

    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: logFormat,
      defaultMeta: { service: process.env.APP_NAME || 'app' },
      transports: [
        // Error logs
        new winston.transports.File({
          filename: path.join(logConfig.path, 'error.log'),
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        // Combined logs
        new winston.transports.File({
          filename: path.join(logConfig.path, 'combined.log'),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
      exitOnError: false,
    });

    // Development logging
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      );
    }
  }

  addLog(options: IOptionLog): void {
    try {
      const logLevel = this.validateLogLevel(options.level);
      this.logger.log({
        level: logLevel, // 'info', 'error', 'warn', 'debug'
        timestamp: new Date().toISOString(), // ISO format, chuẩn cho log system
        message: options.msg || '', // Mô tả ngắn gọn
        code: options.msgCode || '', // Mã lỗi/operation để phân loại
        traceId: options.traceId, // ID để liên kết các log của 1 request
        userId: options.userId, // Nếu có user thực hiện
        ip: options.ip, // Địa chỉ IP client
        method: options.method, // GET/POST/PUT/...
        path: options.path, // endpoint: /api/user/login
        system: options.system || 'app', // hệ thống hoặc microservice
        request: this.sanitizeData(options.request), // dữ liệu đầu vào
        response: this.sanitizeData(options.response), // dữ liệu đầu ra
        duration: options.duration, // thời gian xử lý (ms)
        stack: options.stack || undefined, // nếu có lỗi (error)
      });
    } catch (error) {
      Logger.error('Logging failed:', error);
      Logger.log('Original log data:', options);
    }
  }

  getLogger(): winston.Logger {
    return this.logger;
  }

  private validateLogLevel(level?: LevelLog): string {
    const validLevels = ['error', 'warn', 'info', 'debug'];
    return validLevels.includes(level?.toLowerCase() || '') ? level?.toLowerCase() : 'info';
  }

  private sanitizeData(data: unknown): unknown {
    try {
      if (data === null || data === undefined) {
        return null;
      }
      // Loại bỏ các thông tin nhạy cảm
      const sensitiveFields = ['password', 'token', 'secret', 'authorization'];
      const sanitized = JSON.parse(JSON.stringify(data));

      if (typeof sanitized === 'object') {
        Object.keys(sanitized).forEach((key) => {
          if (sensitiveFields.includes(key.toLowerCase())) {
            sanitized[key] = '[REDACTED]';
          }
        });
      }
      return sanitized;
    } catch {
      return String(data);
    }
  }
}
