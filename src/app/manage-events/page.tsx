import { auth } from "@/lib/auth";
import ManageEvents from "@/components/manage-events/manage-events";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageEventsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return <ManageEvents />;
}
