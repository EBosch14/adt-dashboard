import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const { name, phone, email } = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
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

    const provider = await prismadb.provider.create({
      data: {
        email,
        name,
        phone,
        store_id: params.store_id,
      },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.log("[PROVIDERS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.store_id,
        user_id,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const provider = await prismadb.provider.findMany({
      where: { store_id: params.store_id },
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.log("[PROVIDERS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
