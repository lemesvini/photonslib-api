import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePageInput, UpdatePageInput, GetPageParams, GetPagesQuery } from "./page.schema";
export declare function createPageHandler(request: FastifyRequest<{
    Body: CreatePageInput;
}>, reply: FastifyReply): Promise<void>;
export declare function getPageHandler(request: FastifyRequest<{
    Params: GetPageParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getPagesHandler(request: FastifyRequest<{
    Querystring: GetPagesQuery;
}>, reply: FastifyReply): Promise<void>;
export declare function updatePageHandler(request: FastifyRequest<{
    Params: GetPageParams;
    Body: UpdatePageInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deletePageHandler(request: FastifyRequest<{
    Params: GetPageParams;
}>, reply: FastifyReply): Promise<undefined>;
//# sourceMappingURL=page.controller.d.ts.map