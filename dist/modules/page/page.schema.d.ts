import { z } from "zod";
declare const tagInputSchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const tagResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    color: z.ZodString;
}, z.core.$strip>;
declare const createPageSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    aiDesc: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    thumbnail: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdDate: z.ZodString;
    parentId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    order: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
declare const updatePageSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    aiDesc: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    thumbnail: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdDate: z.ZodOptional<z.ZodString>;
    parentId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    order: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const getPageParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const getPagesQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    tag: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const pageResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodNullable<z.ZodString>;
    aiDesc: z.ZodNullable<z.ZodString>;
    image: z.ZodNullable<z.ZodString>;
    thumbnail: z.ZodNullable<z.ZodString>;
    createdDate: z.ZodOptional<z.ZodString>;
    parentId: z.ZodNullable<z.ZodNumber>;
    order: z.ZodNumber;
    tags: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        color: z.ZodString;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const getPagesResponseSchema: z.ZodObject<{
    pages: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        content: z.ZodNullable<z.ZodString>;
        aiDesc: z.ZodNullable<z.ZodString>;
        image: z.ZodNullable<z.ZodString>;
        thumbnail: z.ZodNullable<z.ZodString>;
        createdDate: z.ZodOptional<z.ZodString>;
        parentId: z.ZodNullable<z.ZodNumber>;
        order: z.ZodNumber;
        tags: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            color: z.ZodString;
        }, z.core.$strip>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
declare const deletePageResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type TagInput = z.infer<typeof tagInputSchema>;
export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type GetPageParams = z.infer<typeof getPageParamsSchema>;
export type GetPagesQuery = z.infer<typeof getPagesQuerySchema>;
export type PageResponse = z.infer<typeof pageResponseSchema>;
export type GetPagesResponse = z.infer<typeof getPagesResponseSchema>;
export type DeletePageResponse = z.infer<typeof deletePageResponseSchema>;
export { tagInputSchema, tagResponseSchema, createPageSchema, updatePageSchema, getPageParamsSchema, getPagesQuerySchema, pageResponseSchema, getPagesResponseSchema, deletePageResponseSchema, };
//# sourceMappingURL=page.schema.d.ts.map