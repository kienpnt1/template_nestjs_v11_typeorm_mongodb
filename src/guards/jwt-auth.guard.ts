import { APP_CONFIG } from '@configs/app.config';
import { ConstantError } from '@core/constants';
import { BaseError } from '@core/exceptions';
import { PermissionUtil } from '@core/utils';
import { ExecutionContext, Injectable, UnauthorizedException, Logger, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    if (err) throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });

    const request = context.switchToHttp().getRequest();
    const feature = this.reflector.get<string>('feature', context.getHandler());
    const permission = this.reflector.get<string>('permission', context.getHandler());
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const allowAnonymous = this.reflector.get<string[]>('allowAnonymous', context.getHandler());
    const allowSecret = this.reflector.get<string[]>('allowSecret', context.getHandler());
    const allowClientSecret = this.reflector.get<string[]>('allowClientSecret', context.getHandler());

    if (allowAnonymous) {
      return user;
    }
    // verify secret
    if (allowSecret) {
      const secretKey = request.headers['secret-keys'];
      if (_.isEmpty(secretKey))
        throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      if (secretKey !== APP_CONFIG.ENV.SECURE.SECRET_KEY)
        throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      if (user && roles) {
        if (!roles.includes(user.role))
          throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
        return user;
      } else {
        return {};
      }
    }
    // verify client secret
    if (allowClientSecret) {
      const secretKey = request?.headers['client-secret-keys'] || request?.headers['x-client-secret-keys'] || '';
      if (_.isEmpty(secretKey))
        throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      const sojoClientSecretKeys: string[] = this.getClientsSecret();
      if (!sojoClientSecretKeys || !sojoClientSecretKeys.length)
        throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      if (!sojoClientSecretKeys.includes(secretKey)) {
        throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      }
      return {};
    }

    if (!user)
      throw new UnauthorizedException({ message: ConstantError.REQUEST_ERRORS['401'].message, statusCode: 401 });
    if (feature && permission !== undefined) {
      return user; //todo: igrnore check check permission for develop.
      // const rawPermissions = user?.accessKey;
      // if (!rawPermissions) throw new ForbiddenException('No permissions found');
      // const modules = {};
      // for (const part of rawPermissions.split('-')) {
      //   const [mod, mask] = part.split(':');
      //   if (mask) modules[mod] = PermissionUtil.parseBitPermissions(mask);
      // }
      // const allowed = modules[feature]?.[permission];
      // if (!allowed) {
      //   throw new ForbiddenException(`No permission for ${feature}:${permission}`);
      // }
      // return user;
    }
    return user;
  }

  getClientsSecret() {
    const envClients = APP_CONFIG.ENV.SECURE.SECRET_KEY_CLIENT_IDS;
    let keys: string[] = [];
    try {
      if (!envClients || _.isEmpty(envClients)) return keys;
      const decodeFormat = envClients.split('|');
      if (!decodeFormat.length) return keys;
      decodeFormat.forEach((element) => {
        const decodeTmp = element.split(':');
        if (decodeTmp.length !== 2) {
          throw new BaseError({ message: 'FORMAT_CLIENT_ENV_IS_NOT_VALID' });
        }
        const decodeKeys = decodeTmp[1].split(',');
        if (decodeKeys.length) {
          keys = keys.concat(decodeKeys);
        }
      });
      return keys;
    } catch (error) {
      return [];
    }
  }
}
