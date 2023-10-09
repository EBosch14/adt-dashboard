import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ClientsClient } from "./components/client";
import { ClientsColumn } from "./components/columns";

const ClientsPage = async ({ params }: { params: { store_id: string } }) => {
  const clients = await prismadb.client.findMany({
    where: {
      store_id: params.store_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedClients: ClientsColumn[] = clients.map((item) => ({
    id: item.id,
    full_name: item.full_name,
    phone: item.phone,
    email: item.email,
    city: item.city,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientsClient data={formattedClients} />
      </div>
    </div>
  );
};

export default ClientsPage;
