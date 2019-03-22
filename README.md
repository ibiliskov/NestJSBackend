## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript connecting to [PostgreSQL](https://www.postgresql.org/).

## Installation

```bash
$ npm install
```

## Requirements

Have PostgreSQL running locally on port `5432` and have database `nestjs-users`.  
To change connection, modify `ormconfig.json`.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Use [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/) to send API requests:

- Gets all users from DB  
`GET /users`  

- Get specific user by email  
`GET /users/:email`

- Create new user  
`POST /users`    
```typescript  
{
  user: {
    firstName: string,
    lastName: string,
    email: string,
  }
}
```  

- Delete user  
`DELETE /users/:email`

## License

  [MIT licensed](LICENSE).
