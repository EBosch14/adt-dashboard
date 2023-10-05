"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string | number;
  stock: string | number;
  size: string;
  category: string;
  is_archived: boolean;
  created_at: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "stock",
    header: "cantidad disponible",
  },
  {
    accessorKey: "size",
    header: "Capacidad / Tamaño",
  },
  {
    accessorKey: "is_archived",
    header: "Archivado",
  },
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
