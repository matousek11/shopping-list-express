module.exports = {
  testEnvironment: 'node',
    "roots": [
      "<rootDir>/tests/jest"
    ],
    "testMatch": [
      "**/tests/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  }