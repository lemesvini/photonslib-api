import { z } from "zod";

const tagInputSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().min(1).max(20).optional(),
});

const tagResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

const createPageSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().optional().nullable(),
  aiDesc: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  parentId: z.number().int().positive().optional().nullable(),
  order: z.number().int().min(0).optional(),
  tags: z.array(tagInputSchema).optional().default([]),
});

const updatePageSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional().nullable(),
  aiDesc: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  parentId: z.number().int().positive().optional().nullable(),
  order: z.number().int().min(0).optional(),
  tags: z.array(tagInputSchema).optional(),
});

const getPageParamsSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

const getPagesQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
  parentId: z.string().regex(/^\d+$/).optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});

const pageResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  aiDesc: z.string().nullable(),
  image: z.string().nullable(),
  thumbnail: z.string().nullable(),
  parentId: z.number().nullable(),
  order: z.number(),
  tags: z.array(tagResponseSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const getPagesResponseSchema = z.object({
  pages: z.array(pageResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const deletePageResponseSchema = z.object({
  message: z.string(),
});

export type TagInput = z.infer<typeof tagInputSchema>;
export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type GetPageParams = z.infer<typeof getPageParamsSchema>;
export type GetPagesQuery = z.infer<typeof getPagesQuerySchema>;
export type PageResponse = z.infer<typeof pageResponseSchema>;
export type GetPagesResponse = z.infer<typeof getPagesResponseSchema>;
export type DeletePageResponse = z.infer<typeof deletePageResponseSchema>;

export {
  tagInputSchema,
  tagResponseSchema,
  createPageSchema,
  updatePageSchema,
  getPageParamsSchema,
  getPagesQuerySchema,
  pageResponseSchema,
  getPagesResponseSchema,
  deletePageResponseSchema,
};
