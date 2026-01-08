export class LanguageUtil {
  _data: any = {};
  _lang: string = 'vi';
  constructor(data) {
    if (typeof data === 'object' || Array.isArray(data)) {
      this._data = JSON.parse(JSON.stringify(data));
    }
  }

  switch(lang) {
    try {
      this._lang = lang;
      const result = this.run(this._data);
      return result;
    } catch (error) {
      return {};
    }
  }

  convertArrayToObject(current?) {
    if (Array.isArray(this._data)) {
      const result: any = current || {};
      this._data.forEach((e) => {
        result[e.language] = e.content;
      });

      return result;
    } else {
      return {};
    }
  }

  private run(data) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = this.run(data[i]);
      }
      return data;
    } else if (typeof data === 'object' && data !== null && data !== undefined) {
      if (data[this._lang] !== undefined) {
        return data[this._lang];
      } else {
        Object.keys(data).forEach((key: any) => {
          data[key] = this.run(data[key]);
        });

        return data;
      }
    } else {
      return data;
    }
  }
}
