import prismadb from "@/lib/prismadb";
import { FormSchema } from "@/schemas/shcemas";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const data = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.store_id,
        user_id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const result = FormSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(result.error, { status: 400 });
    }

    const {
      name,
      price,
      stock,
      description,
      category_id,
      size_id,
      provider_id,
      is_archived,
      images,
    } = result.data;

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        stock,
        description,
        category_id,
        size_id,
        provider_id,
        is_archived,
        store_id: "store",
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id") || undefined;
    const size_id = searchParams.get("size_id") || undefined;

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        store_id: params.store_id,
        category_id,
        size_id,
        is_archived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
