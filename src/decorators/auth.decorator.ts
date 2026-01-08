import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export function Auth(params?: {
  feature?: string;
  permission?: any;
  roles?: string[];
  allowAnonymous?: boolean;
  allowSecret?: boolean;
  allowClientSecret?: boolean;
}) {
  return applyDecorators(
    SetMetadata('feature', params?.feature),
    SetMetadata('permission', params?.permission),
    SetMetadata('roles', params?.roles),
    SetMetadata('allowAnonymous', params?.allowAnonymous),
    SetMetadata('allowSecret', params?.allowSecret),
    SetMetadata('allowClientSecret', params?.allowClientSecret),
    UseGuards(JwtAuthGuard),
  );
}
