import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ProviderClient } from "./components/client";
import { ProviderColumn } from "./components/columns";

const ProvidersPage = async ({ params }: { params: { store_id: string } }) => {
  const providers = await prismadb.provider.findMany({
    where: {
      store_id: params.store_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedProviders: ProviderColumn[] = providers.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    created_at: format(item.created_at, "dd/MM/yyyy (p)"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProviderClient data={formattedProviders} />
      </div>
    </div>
  );
};

export default ProvidersPage;
