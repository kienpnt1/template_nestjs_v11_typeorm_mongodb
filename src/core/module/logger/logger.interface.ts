export enum LevelLog {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export enum LogMode {
  All = 'all',
  Access = 'access',
  Error = 'error',
}

export interface IOptionLog {
  msg?: string;
  msgCode?: string;
  level?: LevelLog;
  request?: unknown;
  response?: unknown;
  system?: string;

  traceId?: string;
  userId?: string | number;
  ip?: string;
  method?: string;
  path?: string;
  duration?: number;
  stack?: string;
}

export interface LogMethodOptions {
  level?: LevelLog;
  msgCode?: string;
  logMode?: LogMode;
  fallbackLog?: boolean;
}

export interface LogConfig {
  path: string;
}

export interface ILoggerService {
  addLog(options: IOptionLog): void;
  getLogger(): any;
}
