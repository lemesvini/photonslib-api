import { CreatePageInput, UpdatePageInput, GetPageParams, GetPagesQuery } from "./page.schema";
export declare function createPage(input: CreatePageInput): Promise<{
    id: number;
    title: string;
    content: string | null;
    aiDesc: string | null;
    image: string | null;
    thumbnail: string | null;
    createdDate: string;
    parentId: number | null;
    order: number;
    tags: {
        id: number;
        name: string;
        color: string;
    }[];
    createdAt: string;
    updatedAt: string;
}>;
export declare function getPageById(params: GetPageParams): Promise<{
    id: number;
    title: string;
    content: string | null;
    aiDesc: string | null;
    image: string | null;
    thumbnail: string | null;
    createdDate: string;
    parentId: number | null;
    order: number;
    tags: {
        id: number;
        name: string;
        color: string;
    }[];
    createdAt: string;
    updatedAt: string;
} | null>;
export declare function getPages(query: GetPagesQuery): Promise<{
    pages: any;
    total: any;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updatePage(params: GetPageParams, input: UpdatePageInput): Promise<{
    id: number;
    title: string;
    content: string | null;
    aiDesc: string | null;
    image: string | null;
    thumbnail: string | null;
    createdDate: string;
    parentId: number | null;
    order: number;
    tags: {
        id: number;
        name: string;
        color: string;
    }[];
    createdAt: string;
    updatedAt: string;
}>;
export declare function deletePage(params: GetPageParams): Promise<{
    message: string;
}>;
//# sourceMappingURL=page.service.d.ts.map