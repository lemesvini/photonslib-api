import "dotenv/config";
import fastify from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
import packageJson from "../package.json";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import { authenticateUser } from "./middleware/auth.middleware";

const app = fastify({
  logger: true,
});

const swaggerRoutePrefix = (() => {
  const route = process.env.SWAGGER_ROUTE_PREFIX;
  if (!route || route.length === 0) {
    return "/docs";
  }

  return route.startsWith("/") ? route : `/${route}`;
})();

const defaultServerUrl =
  process.env.SWAGGER_SERVER_URL ||
  `http://localhost:${process.env.PORT || "3000"}`;

app.register(
  swagger,
  withRefResolver({
    openapi: {
      info: {
        title: packageJson.name || "Photonslib API",
        description:
          packageJson.description ||
          "HTTP API powering the Photonslib platform",
        version: packageJson.version || "1.0.0",
      },
      servers: [
        {
          url: defaultServerUrl,
          description: process.env.SWAGGER_SERVER_URL
            ? "Configured server"
            : "Local development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          refreshTokenCookie: {
            type: "apiKey",
            in: "cookie",
            name: "refreshToken",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    hideUntagged: false,
  })
);

app.register(swaggerUi, {
  routePrefix: swaggerRoutePrefix,
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  staticCSP: true,
});

// Add global hook to handle CORS manually
app.addHook("onRequest", async (request, reply) => {
  const origin = request.headers.origin;

  // List of allowed origins
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://async-app-omega.vercel.app",
  ];

  // Check if origin is allowed or matches Vercel pattern
  if (
    origin &&
    (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin))
  ) {
    reply.header("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    reply.header("Access-Control-Allow-Origin", "*");
  }

  reply.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  reply.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  reply.header("Access-Control-Allow-Credentials", "true");
});

// Handle preflight OPTIONS requests
app.addHook("onRequest", async (request, reply) => {
  if (request.method === "OPTIONS") {
    reply.status(200).send();
    return;
  }
});

// Register plugins
app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecretkey-change-in-production",
});

app.register(cookie, {
  secret: process.env.COOKIE_SECRET || "supersecretkey-change-in-production",
  parseOptions: {},
});

// Add authentication decorator
app.decorate("authenticate", authenticateUser);

app.get("/healthCheck", async () => {
  return { status: "ok" };
});

app.get("/test", async () => {
  return {
    message: "test",
    timestamp: new Date().toISOString(),
    data: { test: true },
  };
});

const start = async () => {
  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(userRoutes, { prefix: "/api/users" });
  try {
    const port = parseInt(process.env.PORT || "3000", 10);
    const host =
      process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server is running on http://${host}:${port}`);
    console.log(
      `📘 Swagger UI available at http://${host}:${port}${swaggerRoutePrefix}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
