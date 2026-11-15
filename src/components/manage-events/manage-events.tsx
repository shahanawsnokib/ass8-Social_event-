"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import DeleteEventButton from "@/components/ui/delete_event";
import EditEventDetails from "@/components/ui/editEvenetDetails";
import { fetchCommunityApi } from "@/lib/community-api-client";
import {
  getCommunityEventsForUserUrl,
  getEventDateLabel,
  normalizeCommunityEvents,
  type CommunityEvent,
} from "@/lib/community-events";

export default function ManageEvents() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    async function loadEvents() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchCommunityApi(
          getCommunityEventsForUserUrl(),
          { cache: "no-store" },
        );
        if (!response.ok) {
          throw new Error(`Could not load events (HTTP ${response.status}).`);
        }

        const events = normalizeCommunityEvents(await response.json());
        if (isCurrent) {
          setEvents(events);
        }
      } catch (loadError) {
        console.error("Could not load managed events:", loadError);
        if (isCurrent) {
          setError("We couldn’t load your events. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();
    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  function reloadEvents() {
    setReloadKey((key) => key + 1);
  }

  return (
    <main className="min-h-screen flex-1 bg-[#f7f8f1] px-4 py-10 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Your community, your events
        </p>
        <h1 className="mt-2 text-3xl font-bold">Manage Events</h1>
        <p className="mt-2 text-sm text-[#718078] dark:text-[#aebdb1]">
          Update or remove events you organized.
        </p>

        {isLoading ? (
          <div
            aria-label="Loading your events"
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-2xl bg-white dark:bg-[#1b2d26]"
              />
            ))}
          </div>
        ) : error ? (
          <p role="alert" className="mt-8 rounded-xl bg-red-50 p-5 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </p>
        ) : events.length === 0 ? (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1b2d26]">
            <h2 className="text-lg font-semibold">You haven’t created an event</h2>
            <Link
              href="/events/create"
              className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#214b38] px-5 text-sm font-semibold text-white hover:bg-[#193b32]"
            >
              Create an event
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="flex flex-col rounded-2xl border border-[#e4e9df] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1b2d26]"
              >
                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-[#294837] dark:text-[#dceeb1]">
                  {event.eventType}
                </span>
                <h2 className="mt-4 text-xl font-semibold">{event.title}</h2>
                <div className="mt-4 space-y-3 text-sm text-[#65736a] dark:text-[#c0cdc2]">
                  <p className="flex items-center gap-2">
                    <CalendarDays aria-hidden="true" className="size-4" />
                    {getEventDateLabel(event.eventDate)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin aria-hidden="true" className="size-4" />
                    {event.location}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex min-h-10 items-center rounded-lg border border-[#cbd5ca] px-4 text-sm font-medium dark:border-white/20"
                  >
                    View
                  </Link>
                  <EditEventDetails event={event} onUpdated={reloadEvents} />
                  <DeleteEventButton event={event} onDeleted={reloadEvents} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
