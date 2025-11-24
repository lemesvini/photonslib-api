import { FastifyInstance } from "fastify";
import {
  createPageHandler,
  getPageHandler,
  getPagesHandler,
  updatePageHandler,
  deletePageHandler,
} from "./page.controller";
import {
  createPageSchema,
  updatePageSchema,
  getPageParamsSchema,
  getPagesQuerySchema,
} from "./page.schema";

async function pageRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createPageSchema.parse(request.body);
        } catch (error) {
          return reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createPageHandler
  );

  server.get(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.query = getPagesQuerySchema.parse(request.query);
        } catch (error) {
          return reply
            .status(400)
            .send({ error: "Invalid query parameters", details: error });
        }
      },
    },
    getPagesHandler
  );

  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPageParamsSchema.parse(request.params);
        } catch (error) {
          return reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getPageHandler
  );

  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPageParamsSchema.parse(request.params);
          request.body = updatePageSchema.parse(request.body);
        } catch (error) {
          return reply
            .status(400)
            .send({ error: "Invalid request", details: error });
        }
      },
    },
    updatePageHandler
  );

  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPageParamsSchema.parse(request.params);
        } catch (error) {
          return reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deletePageHandler
  );
}

export default pageRoutes;
