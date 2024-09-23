import { getSelfByUsername } from "@/actions/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Container from "./_components/Container";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function CreatorLayout({
  params,
  children,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);
  if (!self) {
    redirect("/home");
  }
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
