import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const BillboardPage = async ({
  params,
}: {
  params: { product_id: string; store_id: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: { id: params.product_id },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      store_id: params.store_id,
    },
    include: {
      sizes: true,
    },
  });

  const providers = await prismadb.provider.findMany({
    where: {
      store_id: params.store_id,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          providers={providers}
        />
      </div>
    </div>
  );
};

export default BillboardPage;
