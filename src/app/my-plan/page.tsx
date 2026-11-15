import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RemoveJoinedButton from "@/components/my-plan/remove-joined-button";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user?.email;

  const response = await fetch(`http://localhost:5000/joined/${email}`);
  const data = await response.json();
  const joinedEvents = Array.isArray(data) ? data : [];

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

        {joinedEvents.length === 0 ? (
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
                key={event._id ?? event.id}
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
                    joinedRecordId={
                      typeof event._id === "string" ? event._id : ""
                    }
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
};

export default page;
