import type { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import {
  CreatePageInput,
  UpdatePageInput,
  GetPageParams,
  GetPagesQuery,
  TagInput,
} from "./page.schema";

const pageInclude = {
  tags: true,
} as const;

type PageWithRelations = {
  id: number;
  title: string;
  content: string | null;
  aiDesc: string | null;
  image: string | null;
  thumbnail: string | null;
  parentId: number | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<{
    id: number;
    name: string;
    color: string;
  }>;
};

type TagConnectOrCreate = Prisma.TagCreateOrConnectWithoutPagesInput;

function serializePage(page: PageWithRelations) {
  return {
    id: page.id,
    title: page.title,
    content: page.content ?? null,
    aiDesc: page.aiDesc ?? null,
    image: page.image ?? null,
    thumbnail: page.thumbnail ?? null,
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

function buildTagConnectOrCreate(
  tags?: TagInput[]
): TagConnectOrCreate[] | undefined {
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

function parseId(param: string) {
  const id = parseInt(param, 10);
  if (Number.isNaN(id)) {
    throw new Error("Invalid id parameter");
  }
  return id;
}

export async function createPage(input: CreatePageInput) {
  const { tags, parentId, order, ...rest } = input;
  const connectOrCreate = buildTagConnectOrCreate(tags);

  const page = await prisma.page.create({
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

export async function getPageById(params: GetPageParams) {
  const id = parseId(params.id);
  const page = await prisma.page.findUnique({
    where: { id },
    include: pageInclude,
  });

  if (!page) {
    return null;
  }

  return serializePage(page);
}

export async function getPages(query: GetPagesQuery) {
  const pageNumber = Math.max(1, parseInt(query.page ?? "1", 10) || 1);
  const limit = Math.max(1, parseInt(query.limit ?? "10", 10) || 10);
  const skip = (pageNumber - 1) * limit;

  const where: Prisma.PageWhereInput = {};

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
    prisma.page.findMany({
      where,
      include: pageInclude,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.page.count({ where }),
  ]);

  return {
    pages: pages.map(serializePage),
    total,
    page: pageNumber,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function updatePage(
  params: GetPageParams,
  input: UpdatePageInput
) {
  const id = parseId(params.id);
  const { tags, parentId, ...rest } = input;

  const data: Prisma.PageUpdateInput = {
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

  const page = await prisma.page.update({
    where: { id },
    data,
    include: pageInclude,
  });

  return serializePage(page);
}

export async function deletePage(params: GetPageParams) {
  const id = parseId(params.id);
  await prisma.page.delete({ where: { id } });
  return { message: "Page deleted successfully" };
}
