import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <>
      <p>hello admin dashboard</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
