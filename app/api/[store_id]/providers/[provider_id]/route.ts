import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { store_id: string; provider_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.provider_id) {
      return new NextResponse("Provider id is required", { status: 400 });
    }

    const provider = await prismadb.provider.findUnique({
      where: { id: params.provider_id },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.log("[PROVIDER_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { store_id: string; provider_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const { name, phone } = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.provider_id) {
      return new NextResponse("Provider id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
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

    const provider = await prismadb.provider.updateMany({
      where: { id: params.provider_id },
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.log("[PROVIDER_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { store_id: string; provider_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.provider_id) {
      return new NextResponse("Provider id is required", { status: 400 });
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

    const provider = await prismadb.provider.deleteMany({
      where: { id: params.provider_id },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.log("[PROVIDER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
