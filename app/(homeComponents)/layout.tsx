import Sidebar from "./_components/(Sidebar)/Sidebar";
import { Container } from "./_components/Container";
import { Navbar } from "./_components/Navbar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
