import * as express from 'express';
import { StringUtil } from '../utils';
import { ConstantError } from '../exceptions';
import { IErrorResponse } from '../interfaces';

/* eslint-disable */
const exp: any = <any>express;
/**
 * @method ok
 * @description customer response success
 * @param data
 */
exp.response.ok = function (data) {
  const _this: express.Response = this;
  if (_this.statusCode >= 400) throw new RangeError('Status code is not valid');
  _this.json(data);
};

/**
 * @method bad
 * @description customer response failed
 * @summary file attach is delete if response is failed
 * @param code
 * @param message
 * @param errors
 * @return {Response}
 */
exp.response.bad = function (code, message, errors) {
  const _this: express.Response = this;
  const status = (code ? code.status : undefined) || (_this.statusCode < 400 ? 400 : _this.statusCode);
  if (status < 400) throw new RangeError('Status code is not valid');
  if ('object' === typeof code) {
    if (Object.values(ConstantError.SERVER_ERRORS).indexOf(code.name) > -1) {
      console.error(
        '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n',
        code.stack,
        '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      );
      return _this.status(500).json(mapError(code, _this));
    }
    return _this.status(status).json(mapError(code, _this));
  }
  return _this.status(status).json(mapError({ status, code, message, errors }, _this));
};

/**
 * @method maoError
 * @description map error data
 * @param error
 * @param _this -req, res global
 * @return {ErrorResponse}
 */
function mapError(error, _this): IErrorResponse {
  if (!error || 'object' !== typeof error) return undefined;
  const errors: any = {
    code: error.code,
    name: error.name || error.type || ConstantError.REQUEST_ERRORS[error.status || '400'].name,
    message:
      error.message ||
      'ERROR_UNKNOWN' ||
      StringUtil.convertErrorCodeToMessage(error.code) ||
      ConstantError.REQUEST_ERRORS[error.status || 400].message,
    errors: error.errors,
  };
  if (error && error.data) {
    errors.data = error.data;
  }
  return errors;
}

export default 'Extend Express/Response';
/* eslint-enable */
