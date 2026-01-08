# BE API Service

## Prerequisites

- Node.js (>= 22.13.1)
- Yarn (Package Manager)
- Docker (Optional, for containerization)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode (recommended for development)
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

## Docker

### Build Image

To build the Docker image, use the provided Dockerfile in the `.docker` directory.

**Development Build:**

```bash
docker build -f .docker/develop.dockerfile -t be-api-service:dev .
```

**Production Build:**

```bash
docker build -f .docker/production.dockerfile -t be-api-service:prod .
```

### Run Container

After building the image, you can run the container using the following command:

```bash
docker run -d -p 9999:9999 --name be-api-service be-api-service:dev
```

**Notes:**
- The application runs on port **9999** inside the container by default.
- Ensure you have a `.env` file configured if your application relies on environment variables. You can pass it to the container:

```bash
docker run -d -p 9999:9999 --env-file .env --name be-api-service be-api-service:dev
```

## Swagger Documentation

Once the application is running, you can access the Swagger API documentation at:

- **Admin API:** [http://localhost:9999/docs/admin](http://localhost:9999/docs/admin)
- **Guest API:** [http://localhost:9999/docs/guest](http://localhost:9999/docs/guest)
