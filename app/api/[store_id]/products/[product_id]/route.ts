import prismadb from "@/lib/prismadb";
import { FormSchema } from "@/schemas/shcemas";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { store_id: string; product_id: string } }
) {
  try {
    if (!params.product_id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: params.product_id },
      include: {
        images: true,
        category: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { store_id: string; product_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const data = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.product_id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const result = FormSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(result.error, { status: 400 });
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

    const {
      name,
      price,
      stock,
      description,
      category_id,
      provider_id,
      size_id,
      images,
      is_archived,
    } = result.data;

    await prismadb.product.update({
      where: { id: params.product_id },
      data: {
        name,
        price,
        stock,
        description,
        category_id,
        provider_id,
        size_id,
        is_archived,
        store_id: params.store_id,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: { id: params.product_id },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { store_id: string; product_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.product_id) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: { id: params.product_id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
