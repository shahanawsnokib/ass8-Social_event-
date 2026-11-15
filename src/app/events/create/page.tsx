import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventPage from "@/components/ui/create_event/page";

export default async function Page() {
  // Verify the real session here; the Proxy cookie check is only an early redirect.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  return <CreateEventPage />;
}
