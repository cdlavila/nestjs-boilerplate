# Boilerplate NestJS

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Table of Contents

- [Boilerplate NestJS](#boilerplate-nestjs)
- [Table of Contents](#table-of-contents)
    - [Project Description](#project-description)
    - [Install Instructions](#install-instructions)
        - [Step 1](#step-1)
        - [Step 2](#step-2)
        - [Step 3](#step-3)
        - [Step 4](#step-4)
        - [Step 5](#step-5)
    - [Test Instructions](#test-instructions)
    - [Integration Sequence](#integration-sequence)
    - [Other Settings](#other-settings)
        - [Migration commands](#migration-commands)
        - [CLI commands](#cli-commands)
        - [Support](#support)

## Project Description

Boilerplate for Nest.js projects.

## Install Instructions

To install the project, we need to have installed the following tools:

- Node.js in the latest version 🟢

If you don't have Node.js installed, you can install the latest version [here](https://nodejs.org/es/)

#### Step 1

Clone the project

```bash
$ git clone https://github.com/SOLUNTECH/boilerplate-nestjs
```

#### Step 2

Install dependencies

```bash
$ npm install
```

#### Step 3

Create the `.env` file. Then, copy the data from `.env.example` file and give values to the environment variables by
requesting them from the other developers or the product owner.

#### Run the database with Docker (OPTIONAL)

If you just started working on the project, and you don't have a development or test database, you can run it locally
with Docker. Otherwise, you can <b>skip</b> this step.

- Docker and Docker-compose 🐋

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

Give values to the environment variables of the development database in the `.env` file, by copying and pasting the
following lines:

```bash
# Development
DATABASE_HOST_DEV=localhost
DATABASE_PORT_DEV=5432
DATABASE_NAME_DEV=boilerplate
DATABASE_USER_DEV=boilerplate-user
DATABASE_PASSWORD_DEV=boilerplate-password
```

Raise the Docker container that runs the database, by executing the following command in the root of the project:

```bash
$ docker-compose up -d
```

Additionally, you have to run the migrations to create the tables in the database, by executing the following command:

```bash
$ npm run migration:run
```

#### Step 4

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

#### Step 5

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

## Integration Sequence

The integration sequence for the staging environment is defined on the file `/.github/workflows/staging.yml`
It is divided in two jobs

**CI**

1. **Run command npm install:** Install project to generate node_modules folder on GitHub machine
2. **Create env file:** Generate env file to be able to run subsequent commands on GitHub machine
3. **Run command test:handshake:** Run handshake test to check the connection with external services
4. **Run command migration:run:** Run command to migrate the SQL schema and compare it with the PostgreSQL database
5. **Run command npm test:** Run unit tests. The process stops here if one test fail
6. **Run command npm test:e2e:** Run integration tests. The process stops here if one test fail
7. **Perform Sonarqube Scan:** Run sonarqube scan on soluntech.sonarqube.com to check quality code, security
   vulnerabilities and test coverage

**CD**

This sequence depends on Cloud service that you are going to use, please add the sequence here.

The integration sequence for the production environment is defined in two files, one for the continuos integration and
one for the continuos delivery that has to be trigger manually. The files are located
on `/.github/workflows/productionCI.yml` for the continuos integration and `/.github/workflows/productionCD.yml` for the
continuos delivery

**productionCI.yml**

1. **Run command npm install:** Install project to generate node_modules folder on GitHub machine
2. **Create env file:** Generate env file to be able to run subsequent commands on GitHub machine
3. **Run command test:handshake:** Run handshake test to check the connection with external services
4. **Run command migration:run:** Run command to migrate the SQL schema and compare it with the PostgreSQL database
5. **Run command npm test:** Run unit tests. The process stops here if one test fail
6. **Run command npm test:e2e:** Run integration tests. The process stops here if one test fail
7. **Perform Sonarqube Scan:** Run sonarqube scan on soluntech.sonarqube.com to check quality code, security
   vulnerabilities and test coverage

**productionCD.yml**

This sequence depends on Cloud service that you are going to use, please add the sequence here.

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

## Support

- Soluntech - <a href="https://www.soluntech.com/">Website</a>
- Email - <a href="mailto:developers@soluntech.com">Developers Soluntech</a>
