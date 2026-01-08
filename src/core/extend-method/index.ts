// @ts-ignore
export function registerExtensionMethods(options: { response: boolean }) {
  if (options.response) {
    /* eslint-disable */
    const extName = require('./response.ext');
    console.log(`Extension methods of "${extName.default}" has been applied!`);
    /* eslint-enable */
  }
}
