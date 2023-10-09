import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId: user_id } = auth();
    const { full_name, dni, phone, email, country, state, city, address, postal_code } = await req.json();

    if (!user_id) {
      return new NextResponse("Unathenticated", { status: 401 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!full_name) {
      return new NextResponse("Name is required", { status: 400 });
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

    const client = await prismadb.client.create({
      data: {
        full_name,
        dni,
        phone,
        email,
        state,
        city,
        country,
        address,
        postal_code,
        store_id: params.store_id,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENTS_POST]", error);
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

    const clients = await prismadb.client.findMany({
      where: { store_id: params.store_id },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.log("[CLIENTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
