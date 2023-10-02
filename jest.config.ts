export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/helper/**/*.test.ts'], // Matches test files in src/helper directory
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
