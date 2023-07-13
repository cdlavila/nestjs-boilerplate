# NestJS Boilerplate

NestJS Boilerplate for HTTP applications.

We have the following endpoints:
- `GET /api`
- `GET /api/status`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/refresh`
- `POST /api/users`
- `GET /api/users`
- `GET /api/users/myself`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Installation

To install the project, we need to have installed the following tools:

- Node.js in the latest version 🟢

If you don't have Node.js installed, you can install the latest version [here](https://nodejs.org/es/)

#### Step 1

Clone the project

```bash
$ git clone https://github.com/cdlavila/nestjs-boilerplate.git
```

#### Step 2

Install dependencies

```bash
$ npm install
```

#### Step 3

Create the `.env` file. Then, copy the data from `.env.example` file and paste it in the `.env` file. Finally, give values to the environment variables for the development environment.

#### Step 4

Run the database with Docker and Docker-compose 🐋

If you don't have Docker installed, you can install it following
the [Docker documentation](https://docs.docker.com/engine/install/)

<blockquote>
<span>
💡
</span>
<span>
If you install Docker Desktop (on Windows and Mac), it comes with docker compose, but if you install it on Linux you must install it separately.
</span>
</blockquote>

Raise the Docker container that runs the database, by executing the following command in the root of the project:

```bash
$ docker-compose up -d postgres
```

#### Step 5

Run the app

```bash
# normal mode
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# debug mode
$ npm run start:debug
```

#### Step 6

If the tha app is running correctly, you can see the main route response in the browser, by clicking on the first link
that appears in the terminal.

Additionally, you can see the <a href="https://swagger.io">Swagger</a> documentation by clicking on the second link that
appears in the terminal.

## Test Instructions

```bash
# unit tests
$ npm run test
```

```bash
# e2e tests
$ npm run test:e2e
```

```bash
# test coverage
$ npm run test:cov
```

## Other Settings

### Migration commands

Make sure that you are in the environment that you want to run the migrations in the `.env` file.

```bash
# run migrations
$ npm run migration:run
```

```bash
# rollback the last migration
$ npm run migration:revert
```

```bash
# show the migration list
$ npm run migration:show
```

```bash
# create a new migration file
$ npm run migration:create --name=<migration-name>
```

```bash
# generate a new migration file, taking into account the changes made in the entities
$ npm run migration:generate --name=<migration-name>
```

### CLI commands

```bash
#  run linter
$ npm run lint
```

```bash
# run linter and fix errors
$ npm run lint:fix
```

```bash
# generate a new module
$ npm run module:generate --name=<module-name>
```

```bash
# generate a new service
$ npm run service:generate --module=<module-name> --name=<service-name>
```

```bash
# generate a new controller
$ npm run controller:generate --module=<module-name> --name=<controller-name>
```

```bash
# generate a whole CRUD
$ npm run crud:generate --name=<crud-name>
```

```bash
# generate a new dto
$ npm run dto:generate --module=<module-name> --name=<dto-name>
```

```bash
# generate a new decorator
$ npm run decorator:generate --module=<module-name> --name=<decorator-name>
```

```bash
# generate a new guard
$ npm run guard:generate --module=<module-name> --name=<guard-name>
```

```bash
# generate a new filter
$ npm run filter:generate --module=<module-name> --name=<filter-name>
```
