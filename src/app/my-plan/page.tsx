import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import RemoveJoinedButton from "@/components/my-plan/remove-joined-button";
import { getCommunityJoinedEventsForUserUrl } from "@/lib/community-events";

type JoinedEvent = {
  id: string;
  joinedRecordId: string;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  location: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getJoinedEvents(payload: unknown): JoinedEvent[] {
  let records: unknown[] = [];

  if (Array.isArray(payload)) {
    records = payload;
  } else if (isRecord(payload)) {
    const wrappedRecords =
      payload.joinedEvents ?? payload.joined ?? payload.events ?? payload.data;
    records = Array.isArray(wrappedRecords) ? wrappedRecords : [payload];
  }

  // Keep the registration ID separate from the event ID for the Remove button.
  return records
    .filter(isRecord)
    .flatMap((record) => {
      if (typeof record.id !== "string") {
        return [];
      }

      return [{
        id: record.id,
        joinedRecordId:
          typeof record._id === "string" ? record._id : "",
        title: typeof record.title === "string" ? record.title : "Community event",
        description:
          typeof record.description === "string" ? record.description : "",
        eventType:
          typeof record.eventType === "string" ? record.eventType : "Community",
        eventDate: typeof record.eventDate === "string" ? record.eventDate : "",
        location:
          typeof record.location === "string"
            ? record.location
            : "Location to be announced",
      }];
    })
    .sort((first, second) => first.eventDate.localeCompare(second.eventDate));
}

export default async function MyPlanPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  let joinedEvents: JoinedEvent[] = [];
  let loadError = false;

  try {
    const response = await fetch(getCommunityJoinedEventsForUserUrl(email), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Could not load joined events (HTTP ${response.status}).`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error("The joined-events endpoint returned a non-JSON response.");
    }

    joinedEvents = getJoinedEvents(await response.json());
  } catch (error) {
    console.error("Could not load My Plan:", error);
    loadError = true;
  }

  return (
    <main className="min-h-screen flex-1 bg-[#f7f8f1] px-4 py-10 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Your community commitments
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Plan</h1>
        <p className="mt-2 text-sm text-[#718078] dark:text-[#aebdb1]">
          Keep track of the events you have signed up to support.
        </p>

        {loadError ? (
          <p
            role="alert"
            className="mt-8 rounded-xl bg-red-50 p-5 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200"
          >
            We couldn&apos;t load your plan. Please try again later.
          </p>
        ) : joinedEvents.length === 0 ? (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1b2d26]">
            <h2 className="text-lg font-semibold">No events in your plan yet</h2>
            <p className="mt-2 text-sm text-[#718078] dark:text-[#aebdb1]">
              Explore upcoming community events and join one that matters to you.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#214b38] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#193b32]"
            >
              Explore events
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((event) => (
              <article
                key={event.joinedRecordId || event.id}
                className="flex flex-col rounded-2xl border border-[#e4e9df] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1b2d26]"
              >
                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-[#294837] dark:text-[#dceeb1]">
                  {event.eventType}
                </span>
                <h2 className="mt-4 text-xl font-semibold">{event.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#65736a] dark:text-[#c0cdc2]">
                  {event.description}
                </p>
                <div className="mt-5 space-y-3 text-sm text-[#65736a] dark:text-[#c0cdc2]">
                  <p className="flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                    />
                    {event.eventDate}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                    />
                    {event.location}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <RemoveJoinedButton
                    joinedRecordId={event.joinedRecordId}
                    eventTitle={event.title}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
