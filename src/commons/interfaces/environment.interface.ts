export interface AppEnvironment {
  NODE_ENV: string;
  VERSION: string;
  APP: {
    PORT: number;
    NAME: string;
  };
  DATABASE: {
    MONGODB: {
      URI: string;
      HOST: string;
      PORT: number;
      NAME: string;
      USERNAME: string;
      PASSWORD: string;
    };
    REDIS: {
      HOST: string;
      PORT: number;
      DB: number;
      PASS: string;
    };
  };
  KAFKA_CONFIG: {
    SHOW_LOG: boolean;
    BROKERS: Array<string>;
    GROUP_ID: string;
    CLIENT_ID: string;
  };
  SECURE: {
    SECRET_KEY: string;
    SECRET_KEY_CLIENT_IDS: string;
    JWT: {
      JWT_SECRET: string;
      EXPIRE: number;
    };
  };

  LOGS: {
    IS_HAS_LOG: boolean;
    PATH: string;
  };
}
