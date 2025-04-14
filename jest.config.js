/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/__specs__/setupTests.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^url:.*\\.(svg|png|jpg|jpeg)$': '<rootDir>/__specs__/mocks/fileMock.ts',
  },
}
