import * as crypto from 'crypto';
import * as numeral from 'numeral';

export class StringUtil {
  /**
   * @method convertErrorCodeToMessage
   * @param code
   */
  public static convertErrorCodeToMessage(code: string): string {
    const errorPattern: RegExp = /([A-Z_0-9]+)/g;
    if (!code || !code.match(errorPattern)) return undefined;
    const output = code
      .split('_')
      .map((x) => x.toLowerCase())
      .join(' ');
    return output[0].toUpperCase() + output.substr(1);
  }

  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static genRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * @function genRandomNumber
   * @param length
   */
  public static genRandomNumber(length = 3): string {
    let formater = '';
    for (let i = 0; i < length; i++) {
      formater += '0';
    }
    return numeral(Math.ceil(Math.random() * Math.pow(10, length) - 1)).format(formater);
  }

  /**
   * @method genRandomNumberRanger
   * @description gen random number in ranger
   * @param {number} min ranger min value, default = 100000
   * @param {number} max ranger max value, default = 999999
   * @return {any}
   */
  public static genRandomNumberRanger(min: number = 100000, max: number = 999999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * hashes a string with a specific algorithm.
   * @param {string} input Input string
   * @param {string} salt Salt
   * @param {string} algorithm algorithm uses to hashes(default sha512)
   * @returns {string} hashes string
   */
  public static hashString(input: string, salt: string, algorithm?: string): string {
    algorithm = algorithm || 'sha512';
    const hash = crypto.createHmac(algorithm, salt);
    hash.update(input);
    return hash.digest('hex');
  }

  /**
   * compare hash string
   * @param {string} input Input string
   * @param {string} compareString Input string
   * @returns {boolean} true/false
   */
  public static compareHashString(input: string, compareString: string): boolean {
    return input === compareString;
  }

  public static removeAllSpecialCharacter(str: string) {
    if (!isNaN(Number(str))) {
      return str;
    }
    return str.replace(
      /[^a-zA-Z \- , . ; _ 0-9 : àáạảãâầấậẩẫăằắặẳẵ èéẹẻẽêềếệểễ ìíịỉĩ òóọỏõôồốộổỗơờớợởỡ ùúụủũưừứựửữ ỳýỵỷỹ ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ ÈÉẸẺẼÊỀẾỆỂỄ ÌÍỊỈĨ ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ ÙÚỤỦŨƯỪỨỰỬỮ ỲÝỴỶỸ]/g,
      '',
    );
  }

  public static detectDomain(domain: string) {
    if (domain === undefined) return undefined;
    const methodHttp = ['http://', 'https://'];
    methodHttp.map((item) => {
      domain = domain.replace(item, '');
    });
    return domain;
  }

  public static truncateText(text: string, maxLength = 32767) {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
  }

  public static isBase64String(str: string): boolean {
    if (!str || typeof str !== 'string') return false;

    // Base64 regex chuẩn RFC 4648
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

    if (!base64Regex.test(str)) return false;

    try {
      // Thử decode, nếu lỗi -> không phải base64
      const buffer = Buffer.from(str, 'base64');

      // Nếu decode ra buffer rỗng → không hợp lệ
      return buffer.length > 0;
    } catch (e) {
      return false;
    }
  }
}
