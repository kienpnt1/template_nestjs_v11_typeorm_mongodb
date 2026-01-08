/**
 * @class AppConst
 * @description define common app constants
 */

export class AppConst {
  static readonly API_PREFIX: string = 'api';
  static readonly API_VERSION: string = 'v1';
  static readonly PAGE_SIZE: number = 20;
  static readonly PAGE_DEFAULT: number = 1;
  static readonly LANGUAGE_DEFAULT: string = 'vi';
  static readonly CHANEL_DEFAULT: string = 'web';
  static readonly CHANEL_LIST = {
    WEB: 'web',
    APP: 'app',
    IOS: 'ios',
    ANDROID: 'android',
  };
  static readonly LANGUAGE_LIST = {
    EN: 'en',
    VI: 'vi',
  };
}
