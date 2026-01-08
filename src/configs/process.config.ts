export class Config {
  'example' = undefined;
  'example.data' = undefined;
  constructor(properties) {
    this.addAll(properties);
  }

  public get(key: string): any {
    return this[key];
  }

  public set(key: string, value: any): any {
    return (this[key] = value);
  }

  public addAll(properties): any {
    properties = objectToArray(properties);
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        this[property] = properties[property];
      }
    }
  }
}

const config = new Config({});

export { config };

function objectToArray(source, currentKey?, target?): any {
  target = target || {};
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const newKey = currentKey ? currentKey + '.' + property : property;
      const newVal = source[property];

      if (typeof newVal === 'object') {
        objectToArray(newVal, newKey, target);
      } else {
        target[newKey] = newVal;
      }
    }
  }
  return target;
}
