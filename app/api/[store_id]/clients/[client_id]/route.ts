import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { store_id: string; client_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.client_id) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    const client = await prismadb.client.findUnique({
      where: { id: params.client_id },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { store_id: string; client_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const { full_name, dni, phone, email, country, state, city, address, postal_code  } = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.client_id) {
      return new NextResponse("Client id is required", { status: 400 });
    }

    if (!full_name) {
      return new NextResponse("Full_name is required", { status: 400 });
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

    const client = await prismadb.client.updateMany({
      where: { id: params.client_id },
      data: {
        full_name, dni, phone, email, country, state, city, address, postal_code
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { store_id: string; client_id: string } }
) {
  try {
    const { userId: user_id } = auth();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.client_id) {
      return new NextResponse("Client id is required", { status: 400 });
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

    const client = await prismadb.client.deleteMany({
      where: { id: params.client_id },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
