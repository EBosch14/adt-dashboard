"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

const AsideComponent = () => {
  const pathname = usePathname();
  const params = useParams();

  const items = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/products",
      label: "Productos",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/services",
      label: "Servicios",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/clients",
      label: "Clientes",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/providers",
      label: "Proveedores",
      active: true,
    },
    {
      href: "/orders",
      label: "Ventas",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/settings",
      label: "Ajustes",
      active: pathname === `/${params.store_id}`,
    },
    {
      href: "/categories",
      label: "Categorías",
      active: pathname === `/${params.store_id}`,
    },
  ];
  //TODO: ELIMINAR LOS ITEMS

  return (
    <div className="border-r-2 w-48">
      <aside className="pl-4 pr-0 pt-8 flex flex-col justify-center space-y-2 lg:space-y-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-2 py-2 rounded-md rounded-e-none font-medium transition-colors hover:text-primary hover:bg-secondary capitalize",
              item.active
                ? "bg-secondary px-3 py-3 text-base"
                : "text-muted-foreground"
            )}>
            {item.label}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default AsideComponent;
