import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex h-screen w-screen flex-col">
      <Navbar />
      <section className="flex-grow">{children}</section>
    </main>
  );
}
