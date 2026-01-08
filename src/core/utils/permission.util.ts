import { BitPermission } from '@core/constants';

export class PermissionUtil {
  static parseBitPermissions(mask: string) {
    const bits = mask.split(''); // "110000000" => ['1','1','0',...]
    return {
      [BitPermission.VIEW]: bits[0] === '1',
      [BitPermission.CREATE]: bits[1] === '1',
      [BitPermission.UPDATE]: bits[2] === '1',
      [BitPermission.DELETE]: bits[3] === '1',
      [BitPermission.IMPORT]: bits[4] === '1',
      [BitPermission.EXPORT]: bits[5] === '1',
      [BitPermission.PRINT]: bits[6] === '1',
      [BitPermission.OTHER]: bits[7] === '1',
      [BitPermission.MENU]: bits[8] === '1',
    };
  }
}
