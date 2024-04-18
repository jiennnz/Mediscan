import { Diagnose } from "@/components/pages/public/tools/Diagnose";
import { getSession } from "@/lib/server/auth";
import { dbConnect } from "@/lib/server/dbConnect";

export default async function Home() {
  await dbConnect();
  const session = await getSession();
  const userId = session?.sessionData?.id ?? null;

  return (
    <main className="flex h-full w-full">
      <Diagnose userId={userId} />
    </main>
  );
}
