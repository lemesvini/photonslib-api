"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageHandler = createPageHandler;
exports.getPageHandler = getPageHandler;
exports.getPagesHandler = getPagesHandler;
exports.updatePageHandler = updatePageHandler;
exports.deletePageHandler = deletePageHandler;
const page_service_1 = require("./page.service");
async function createPageHandler(request, reply) {
    try {
        const page = await (0, page_service_1.createPage)(request.body);
        reply.code(201).send(page);
    }
    catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: "Failed to create page" });
    }
}
async function getPageHandler(request, reply) {
    try {
        const page = await (0, page_service_1.getPageById)(request.params);
        if (!page) {
            return reply.status(404).send({ error: "Page not found" });
        }
        reply.send(page);
    }
    catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: "Failed to get page" });
    }
}
async function getPagesHandler(request, reply) {
    try {
        const result = await (0, page_service_1.getPages)(request.query);
        reply.send(result);
    }
    catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: "Failed to get pages" });
    }
}
async function updatePageHandler(request, reply) {
    try {
        const page = await (0, page_service_1.updatePage)(request.params, request.body);
        reply.send(page);
    }
    catch (error) {
        request.log.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Page not found" });
        }
        reply.status(500).send({ error: "Failed to update page" });
    }
}
async function deletePageHandler(request, reply) {
    try {
        const result = await (0, page_service_1.deletePage)(request.params);
        reply.send(result);
    }
    catch (error) {
        request.log.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Page not found" });
        }
        reply.status(500).send({ error: "Failed to delete page" });
    }
}
//# sourceMappingURL=page.controller.js.map