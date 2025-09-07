/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tests/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
};
