"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Capacidades (${data?.length})`}
          description="Administra las capacidades para tu depósito"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading
        title="API"
        description="Llamadas a la API para las capacidades"
      />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
