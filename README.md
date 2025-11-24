# Photonslib API

## Local development

```bash
pnpm install
pnpm dev
```

The server listens on the port defined by `PORT` (defaults to `3000`).

## Swagger / OpenAPI documentation

- Swagger is provided via `@fastify/swagger` and `@fastify/swagger-ui`.
- Visit `http://localhost:3000/docs` after starting the server to inspect the interactive Swagger UI.
- The generated JSON and YAML specs are available at `/docs/json` and `/docs/yaml` respectively.
- Use `SWAGGER_ROUTE_PREFIX` to change the UI route (defaults to `/docs`).
- Use `SWAGGER_SERVER_URL` to control the `servers` entry exposed in the spec when running behind a proxy or on a different base URL.
