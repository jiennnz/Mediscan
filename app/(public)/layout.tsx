import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full flex-col">
      <nav className="shadowNav h-[8%] flex-grow-0">
        <Navbar />
      </nav>
      <section className="flex-grow">{children}</section>
    </main>
  );
}
