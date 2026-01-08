import { Logger } from '@nestjs/common';
import axios from 'axios';

export class AxiosInstance {
  protected api;
  constructor(_url, _config?) {
    let defaultConfig = {
      baseURL: _url,
      timeout: 1000 * 60,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (_config) defaultConfig = Object.assign(defaultConfig, _config);
    this.api = axios.create(defaultConfig);
  }

  get(url, config = {}) {
    const defaultConfig = {
      ...config,
    };
    const request = this.api.get(url, defaultConfig).then(this.mapData).catch(this.mapError);
    return request;
  }

  post(url, body, config = {}) {
    const defaultConfig = {
      ...config,
    };
    const request = this.api.post(url, body, defaultConfig).then(this.mapData).catch(this.mapError);
    return request;
  }

  put(url, body, config = {}) {
    const defaultConfig = {
      ...config,
    };
    const request = this.api.put(url, body, defaultConfig).then(this.mapData).catch(this.mapError);
    return request;
  }

  patch(url, body, config = {}) {
    const defaultConfig = {
      ...config,
    };
    const request = this.api.patch(url, body, defaultConfig).then(this.mapData).catch(this.mapError);
    return request;
  }

  _delete(url, config = {}) {
    const defaultConfig = {
      ...config,
    };
    const request = this.api.delete(url, defaultConfig).then(this.mapData).catch(this.mapError);
    return request;
  }

  mapData(res) {
    if (res && res.data && process.env.LOGS_IS_HAS && process.env.LOGS_IS_HAS === 'true') {
      Logger.log(`[AxiosInstance] fromResponse: ${JSON.stringify(res.data)}`);
    }
    return res.data;
  }

  mapError(error) {
    if (error.response) {
      Logger.error(`[AxiosInstance] Status: ${error.response.status}`);
      Logger.error(`[AxiosInstance] Headers: ${JSON.stringify(error.response.headers)}`);
      Logger.error(`[AxiosInstance] Data: ${JSON.stringify(error.response.data)}`);
      throw error.response.data;
    } else if (error.request) {
      Logger.error('[AxiosInstance] No response received:', error);
      throw error.request;
    } else {
      Logger.error('[AxiosInstance] Axios request setup error:', error);
      throw error;
    }
  }
}
