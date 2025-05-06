/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    verbose: true,
    coverageReporters: ['text', 'clover', 'json', 'lcov'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  }
  
export default config