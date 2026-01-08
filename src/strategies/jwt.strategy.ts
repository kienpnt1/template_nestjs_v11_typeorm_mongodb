import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { APP_CONFIG } from '@configs/app.config';
import { IUser } from '@core/interfaces';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
    });
  }

  async validate(payload): Promise<IUser> {
    return {
      id: payload.UserId,
      username: payload.Username,
      mapId: payload.UserMapId,
      roleMax: payload.RoleMax,
      roleLevel: payload.RoleLevel,
      roleCode: payload.RoleCode,
      accessKey: payload.AccessKey,
      languageId: payload.LanguageId,
      projectId: payload.ProjectId,
      type: payload.Type,
      departmentId: payload.DepartmentId,
      positionId: payload.PositionId,
    } as IUser;
  }
}
