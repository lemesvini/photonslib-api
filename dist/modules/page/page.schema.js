"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePageResponseSchema = exports.getPagesResponseSchema = exports.pageResponseSchema = exports.getPagesQuerySchema = exports.getPageParamsSchema = exports.updatePageSchema = exports.createPageSchema = exports.tagResponseSchema = exports.tagInputSchema = void 0;
const zod_1 = require("zod");
const tagInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    color: zod_1.z.string().min(1).max(20).optional(),
});
exports.tagInputSchema = tagInputSchema;
const tagResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    color: zod_1.z.string(),
});
exports.tagResponseSchema = tagResponseSchema;
const createPageSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    content: zod_1.z.string().optional().nullable(),
    aiDesc: zod_1.z.string().optional().nullable(),
    image: zod_1.z.string().optional().nullable(),
    thumbnail: zod_1.z.string().optional().nullable(),
    createdDate: zod_1.z.string().datetime(),
    parentId: zod_1.z.number().int().positive().optional().nullable(),
    order: zod_1.z.number().int().min(0).optional(),
    tags: zod_1.z.array(tagInputSchema).optional().default([]),
});
exports.createPageSchema = createPageSchema;
const updatePageSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    content: zod_1.z.string().optional().nullable(),
    aiDesc: zod_1.z.string().optional().nullable(),
    image: zod_1.z.string().optional().nullable(),
    thumbnail: zod_1.z.string().optional().nullable(),
    createdDate: zod_1.z.string().datetime().optional(),
    parentId: zod_1.z.number().int().positive().optional().nullable(),
    order: zod_1.z.number().int().min(0).optional(),
    tags: zod_1.z.array(tagInputSchema).optional(),
});
exports.updatePageSchema = updatePageSchema;
const getPageParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/),
});
exports.getPageParamsSchema = getPageParamsSchema;
const getPagesQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).optional(),
    parentId: zod_1.z.string().regex(/^\d+$/).optional(),
    tag: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
});
exports.getPagesQuerySchema = getPagesQuerySchema;
const pageResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    content: zod_1.z.string().nullable(),
    aiDesc: zod_1.z.string().nullable(),
    image: zod_1.z.string().nullable(),
    thumbnail: zod_1.z.string().nullable(),
    createdDate: zod_1.z.string().datetime().optional(),
    parentId: zod_1.z.number().nullable(),
    order: zod_1.z.number(),
    tags: zod_1.z.array(tagResponseSchema),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.pageResponseSchema = pageResponseSchema;
const getPagesResponseSchema = zod_1.z.object({
    pages: zod_1.z.array(pageResponseSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.getPagesResponseSchema = getPagesResponseSchema;
const deletePageResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.deletePageResponseSchema = deletePageResponseSchema;
//# sourceMappingURL=page.schema.js.map