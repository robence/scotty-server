module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  setupFiles: ['<rootDir>/setupTests.ts'],
  testMatch: ['**/__node_tests__/**.spec.ts'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
};
