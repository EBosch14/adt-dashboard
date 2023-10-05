import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./ui/theme-toggle";

const Navbar = async () => {
  const { userId: user_id } = auth();

  if (!user_id) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      user_id,
    },
  });

  return (
    <div className="border-b-2">
      <div className="flex items-center px-4 h-16">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
