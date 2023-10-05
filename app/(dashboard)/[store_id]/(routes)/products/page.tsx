import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { store_id: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      store_id: params.store_id,
    },
    include: {
      category: true,
      size: true,
      provider: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log(products);

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    is_archived: item.is_archived,
    price: formatter.format(item.price.toNumber()),
    stock: item.stock,
    category: item.category.name,
    size: item.size.name,
    created_at: format(item.created_at, "dd/MM/yyyy (p)"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
