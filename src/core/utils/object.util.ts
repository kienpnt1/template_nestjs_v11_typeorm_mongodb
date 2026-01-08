export class ObjectUtil {
  static removeObjectKeysUndefined(data) {
    for (const key in data) {
      if (data[key] === undefined || data[key] === 'undefined') {
        delete data[key];
      }
    }
    return data;
  }
}
