import prismadb from "@/lib/prismadb";
import { ProviderForm } from "./components/provider-form";

const ProviderPage = async ({
  params,
}: {
  params: { provider_id: string };
}) => {
  const provider = await prismadb.provider.findUnique({
    where: { id: params.provider_id },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProviderForm initialData={provider} />
      </div>
    </div>
  );
};

export default ProviderPage;
