import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPage,
  getPageById,
  getPages,
  updatePage,
  deletePage,
} from "./page.service";
import {
  CreatePageInput,
  UpdatePageInput,
  GetPageParams,
  GetPagesQuery,
} from "./page.schema";

export async function createPageHandler(
  request: FastifyRequest<{ Body: CreatePageInput }>,
  reply: FastifyReply
) {
  try {
    const page = await createPage(request.body);
    reply.code(201).send(page);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: "Failed to create page" });
  }
}

export async function getPageHandler(
  request: FastifyRequest<{ Params: GetPageParams }>,
  reply: FastifyReply
) {
  try {
    const page = await getPageById(request.params);
    if (!page) {
      return reply.status(404).send({ error: "Page not found" });
    }
    reply.send(page);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: "Failed to get page" });
  }
}

export async function getPagesHandler(
  request: FastifyRequest<{ Querystring: GetPagesQuery }>,
  reply: FastifyReply
) {
  try {
    const result = await getPages(request.query);
    reply.send(result);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: "Failed to get pages" });
  }
}

export async function updatePageHandler(
  request: FastifyRequest<{ Params: GetPageParams; Body: UpdatePageInput }>,
  reply: FastifyReply
) {
  try {
    const page = await updatePage(request.params, request.body);
    reply.send(page);
  } catch (error: any) {
    request.log.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Page not found" });
    }
    reply.status(500).send({ error: "Failed to update page" });
  }
}

export async function deletePageHandler(
  request: FastifyRequest<{ Params: GetPageParams }>,
  reply: FastifyReply
) {
  try {
    const result = await deletePage(request.params);
    reply.send(result);
  } catch (error: any) {
    request.log.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Page not found" });
    }
    reply.status(500).send({ error: "Failed to delete page" });
  }
}
