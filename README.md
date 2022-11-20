## Description

Simple server for learning NestJs.

## Env file

Config files must be stored in src/config/env directory
`development.env` - for development mode
`production.env` - for production mode

| Key               | Example            | Description             |
| ----------------- | ------------------ | ----------------------- |
| PORT              | 3000               | Server's port           |
| DATABASE_HOST     | localhost          | Database url            |
| DATABASE_PORT     | 5432               | Database port in use    |
| DATABASE_USERNAME | postgres           | Database user           |
| DATABASE_PASSWORD | postgres           | Database password       |
| DATABASE_NAME     | nest_crud          | Database name           |
| JWT_SECRET        | fusion_development | JWT secret for encoding |

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)
