"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ClientsColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
  data: ClientsColumn[];
}

export const ClientsClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Clientes (${data?.length})`}
          description="Administra tus clientes"
        />
        <Button onClick={() => router.push(`/${params.store_id}/clients/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Llamadas a la API para los clientes" />
      <Separator />
      <ApiList entityName="categories" entityIdName="category_id" />
    </>
  );
};
