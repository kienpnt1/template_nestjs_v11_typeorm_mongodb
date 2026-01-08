import { AppConst } from '../core/constants';
import { IRequest } from '../core/interfaces';
export function validateCommon(req: IRequest, data) {
  data.user = req?.user || undefined;
  const langs = Object.values(AppConst.LANGUAGE_LIST);
  const language = (req.query.lang as string) || undefined;
  data.lang = language ? (langs.includes(language) ? language : AppConst.LANGUAGE_DEFAULT) : AppConst.LANGUAGE_DEFAULT;
  const osType = (req.query.osType as string) || undefined;
  switch (osType) {
    case AppConst.CHANEL_LIST.ANDROID:
    case AppConst.CHANEL_LIST.IOS:
    case AppConst.CHANEL_LIST.APP:
      data.osType = AppConst.CHANEL_LIST.APP;
      break;
    case AppConst.CHANEL_LIST.WEB:
      data.osType = AppConst.CHANEL_LIST.WEB;
      break;
    default:
      data.osType = AppConst.CHANEL_LIST.WEB;
      break;
  }
  if (req.headers['x-forwarded-for'] || req.connection.remoteAddress) {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '::1') as string;
    const splitIp = ip.split(',');
    data.ipAddressInfo = splitIp[0] || '::1';
  }
}
