"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPage = createPage;
exports.getPageById = getPageById;
exports.getPages = getPages;
exports.updatePage = updatePage;
exports.deletePage = deletePage;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const pageInclude = {
    tags: true,
};
function serializePage(page) {
    return {
        id: page.id,
        title: page.title,
        content: page.content ?? null,
        aiDesc: page.aiDesc ?? null,
        image: page.image ?? null,
        thumbnail: page.thumbnail ?? null,
        createdDate: page.createdAt.toISOString(),
        parentId: page.parentId ?? null,
        order: page.order,
        tags: page.tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
        })),
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
    };
}
function buildTagConnectOrCreate(tags) {
    if (!tags || tags.length === 0) {
        return undefined;
    }
    return tags.map((tag) => ({
        where: { name: tag.name },
        create: {
            name: tag.name,
            color: tag.color ?? "#gray",
        },
    }));
}
function parseId(param) {
    const id = parseInt(param, 10);
    if (Number.isNaN(id)) {
        throw new Error("Invalid id parameter");
    }
    return id;
}
async function createPage(input) {
    const { tags, parentId, order, ...rest } = input;
    const connectOrCreate = buildTagConnectOrCreate(tags);
    const page = await prisma_1.default.page.create({
        data: {
            ...rest,
            order: order ?? 0,
            parent: parentId ? { connect: { id: parentId } } : undefined,
            tags: connectOrCreate ? { connectOrCreate } : undefined,
        },
        include: pageInclude,
    });
    return serializePage(page);
}
async function getPageById(params) {
    const id = parseId(params.id);
    const page = await prisma_1.default.page.findUnique({
        where: { id },
        include: pageInclude,
    });
    if (!page) {
        return null;
    }
    return serializePage(page);
}
async function getPages(query) {
    const pageNumber = Math.max(1, parseInt(query.page ?? "1", 10) || 1);
    const limit = Math.max(1, parseInt(query.limit ?? "10", 10) || 10);
    const skip = (pageNumber - 1) * limit;
    const where = {};
    if (query.parentId) {
        where.parentId = parseInt(query.parentId, 10);
    }
    if (query.tag) {
        where.tags = {
            some: {
                name: {
                    equals: query.tag,
                    mode: "insensitive",
                },
            },
        };
    }
    if (query.search) {
        where.OR = [
            { title: { contains: query.search, mode: "insensitive" } },
            { content: { contains: query.search, mode: "insensitive" } },
        ];
    }
    const [pages, total] = await Promise.all([
        prisma_1.default.page.findMany({
            where,
            include: pageInclude,
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
            skip,
            take: limit,
        }),
        prisma_1.default.page.count({ where }),
    ]);
    return {
        pages: pages.map(serializePage),
        total,
        page: pageNumber,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}
async function updatePage(params, input) {
    const id = parseId(params.id);
    const { tags, parentId, ...rest } = input;
    const data = {
        ...rest,
    };
    if (parentId !== undefined) {
        data.parent = parentId
            ? { connect: { id: parentId } }
            : { disconnect: true };
    }
    if (tags) {
        const connectOrCreate = buildTagConnectOrCreate(tags);
        data.tags = {
            set: [],
            ...(connectOrCreate ? { connectOrCreate } : {}),
        };
    }
    const page = await prisma_1.default.page.update({
        where: { id },
        data,
        include: pageInclude,
    });
    return serializePage(page);
}
async function deletePage(params) {
    const id = parseId(params.id);
    await prisma_1.default.page.delete({ where: { id } });
    return { message: "Page deleted successfully" };
}
//# sourceMappingURL=page.service.js.map