"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_controller_1 = require("./page.controller");
const page_schema_1 = require("./page.schema");
async function pageRoutes(server) {
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = page_schema_1.createPageSchema.parse(request.body);
            }
            catch (error) {
                return reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, page_controller_1.createPageHandler);
    server.get("/", {
        preHandler: async (request, reply) => {
            try {
                request.query = page_schema_1.getPagesQuerySchema.parse(request.query);
            }
            catch (error) {
                return reply
                    .status(400)
                    .send({ error: "Invalid query parameters", details: error });
            }
        },
    }, page_controller_1.getPagesHandler);
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = page_schema_1.getPageParamsSchema.parse(request.params);
            }
            catch (error) {
                return reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, page_controller_1.getPageHandler);
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = page_schema_1.getPageParamsSchema.parse(request.params);
                request.body = page_schema_1.updatePageSchema.parse(request.body);
            }
            catch (error) {
                return reply
                    .status(400)
                    .send({ error: "Invalid request", details: error });
            }
        },
    }, page_controller_1.updatePageHandler);
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = page_schema_1.getPageParamsSchema.parse(request.params);
            }
            catch (error) {
                return reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, page_controller_1.deletePageHandler);
}
exports.default = pageRoutes;
//# sourceMappingURL=page.route.js.map