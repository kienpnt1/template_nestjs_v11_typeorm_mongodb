import * as moment from 'moment';

export class DateUtil {
  static convertDate(date, format) {
    if (moment(date, moment.ISO_8601, true).isValid()) {
      return moment(date).format(format || 'YYYY-MM-DD');
    }
    const formatList = [
      'DD/MM/YYYY',
      'MM/DD/YYYY',
      'DD-MM-YYYY',
      'MM-DD-YYYY',
      'YYYY-MM-DD',
      'YYYY-DD-MM',
      'YYYY/MM/DD',
      'YYYY/DD/MM',
    ];
    const findValid = formatList.find((item) => moment(date, item, true).isValid());
    if (!findValid) return undefined;
    return moment(date, findValid).format(format || 'YYYY-MM-DD');
  }

  static compareDate(startYYYYMMDDhhmmss: string, endYYYYMMDDhhmmss: string): number | undefined {
    const formats = ['YYYY-MM-DD HH:mm:ss', moment.ISO_8601, 'YYYY-MM-DD'];
    const start = moment(startYYYYMMDDhhmmss, formats as any, true);
    const end = moment(endYYYYMMDDhhmmss, formats as any, true);
    if (!start.isValid() || !end.isValid()) return undefined;
    const diff = end.diff(start) / 1000;
    return diff;
  }
}
