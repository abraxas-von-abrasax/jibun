/** @type {import('ts-jest/dist/types').InitialOptionsTsJest;} */
export default {
    displayName: 'runner',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
    collectCoverageFrom: ['**/*.ts', '!**/node_modules', '!**/dist'],
};
