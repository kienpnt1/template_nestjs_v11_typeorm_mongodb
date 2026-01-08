module.exports = {
  rootDir: '.',
  testMatch: [
    "<rootDir>/test/integration/**/*.spec.ts"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@commons/(.*)$': '<rootDir>/src/commons/$1',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@modules-admin/(.*)$': '<rootDir>/src/modules-admin/$1',
    '^@modules-internal/(.*)$': '<rootDir>/src/modules-internal/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@databases/(.*)$': '<rootDir>/src/databases/$1',
    '^@interceptors/(.*)$': '<rootDir>/src/interceptors/$1',
    '^@strategies/(.*)$': '<rootDir>/src/strategies/$1',
    '^@decorators/(.*)$': '<rootDir>/src/decorators/$1',
    '^@guards/(.*)$': '<rootDir>/src/guards/$1',
  },
};