import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const { name } = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.store_id) {
      return new NextResponse("Store is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: { id: params.store_id, user_id },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.store_id) {
      return new NextResponse("Store is required", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: { id: params.store_id, user_id },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
