
# Running the Next.js App with Docker

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Build and Run with Docker Compose

1. **Build and start the app:**

   ```sh
   docker-compose up --build
   ```

   This will build the Docker image and start the Next.js app on [http://localhost:3000](http://localhost:3000).

2. **Stop the app:**

   Press `Ctrl+C` in the terminal, then run:

   ```sh
   docker-compose down
   ```

## Additional Docker Commands

- **Rebuild the image:**

  ```sh
  docker-compose build
  ```

- **View logs:**

  ```sh
  docker-compose logs -f
  ```

## Customization

You can modify the `docker-compose.yml` or `Dockerfile` to add environment variables or change settings as needed.
