"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "general",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "paneles",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "categorías",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "capacidades",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "colores",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "productos",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Pedidos",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "ajustes",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "font-medium transition-colors hover:text-primary capitalize",
              route.active
                ? "text-primary font-bold dark:text-white"
                : "text-muted-foreground"
            )}>
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
