"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  getCommunityEvents,
  getEventDateLabel,
  type CommunityEvent,
} from "@/lib/community-events";

const cardStyles = [
  "from-[#567862] via-[#78956e] to-[#d1bd8b]",
  "from-[#315d49] via-[#66866b] to-[#c6a579]",
  "from-[#526d67] via-[#93a477] to-[#d2b88e]",
];

type EventsPageProps = {
  limit?: number;
};

export default function EventsPage({ limit }: EventsPageProps) {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const visibleEvents = limit ? events.slice(0, limit) : events;

  useEffect(() => {
    async function loadEvents() {
      try {
        const eventList = await getCommunityEvents();
        setEvents(eventList);
      } catch (error) {
        console.error("Could not load events:", error);
        setErrorMessage(
          "We couldn't load events. Check that the event server is running, then try again.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <main className="flex-1 bg-[#f7f8f1] px-5 py-8 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1080px]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Find your next good turn
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
              Upcoming community events
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#718078] dark:text-[#aebdb1]">
              Meet your neighbors, lend a hand, and make your part of Dhaka a
              little brighter.
            </p>
          </div>
          <p className="text-xs font-medium text-[#718078] dark:text-[#aebdb1]">
            {isLoading
              ? "Finding events..."
              : `${visibleEvents.length} ${
                  visibleEvents.length === 1 ? "way" : "ways"
                } to get involved`}
          </p>
        </div>

        {errorMessage ? (
          <p
            className="mt-7 rounded-xl border border-[#dd704b]/25 bg-[#fff4ed] p-4 text-sm text-[#8a4935] dark:bg-[#3b2822] dark:text-[#ffd5c4]"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : isLoading ? (
          <p className="mt-7 text-sm text-[#718078] dark:text-[#aebdb1]" role="status">
            Loading community events...
          </p>
        ) : visibleEvents.length === 0 ? (
          <p className="mt-7 rounded-xl bg-white p-5 text-sm text-[#718078] dark:bg-[#1b2d26] dark:text-[#aebdb1]">
            There are no upcoming events yet. Check back soon or host the first
            one for your neighborhood.
          </p>
        ) : (
          <section
            aria-label="Upcoming events"
            className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleEvents.map((event, index) => {
              const fallbackGradient = cardStyles[index % cardStyles.length];
              return (
                <Card
                  key={event.id}
                  className="group gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 shadow-[0_8px_28px_-18px_rgba(25,59,50,0.28)] ring-1 ring-[#193b32]/[0.07] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-20px_rgba(25,59,50,0.35)] dark:bg-[#1b2d26] dark:ring-white/10"
                >
                  <div
                    className={`relative h-44 overflow-hidden bg-gradient-to-br ${fallbackGradient}`}
                  >
                    {event.thumbnailUrl && (
                      <Image
                        src={event.thumbnailUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                        onError={(imageEvent) => {
                          imageEvent.currentTarget.style.display = "none";
                        }}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102c22]/75 via-[#102c22]/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#fffdf7]/95 px-3 py-1 text-[10px] font-semibold text-[#28513f] shadow-sm">
                      {event.eventType}
                    </span>
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-white">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      {event.location}
                    </span>
                    <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 text-[9px] font-semibold text-[#234535] shadow-sm">
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      {getEventDateLabel(event.eventDate)}
                    </span>
                  </div>

                  <CardContent className="flex flex-1 flex-col px-4 pb-4 pt-4">
                    <CardTitle className="line-clamp-2 min-h-11 text-base font-semibold leading-5 tracking-[-0.035em] text-[#193b32] dark:text-[#f8f8ef]">
                      {event.title}
                    </CardTitle>
                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#718078] dark:text-[#aebdb1]">
                      {event.description || "Join neighbors and make a difference in your community."}
                    </p>
                  </CardContent>

                  <CardFooter className="border-t border-[#193b32]/[0.07] bg-transparent px-4 py-3 dark:border-white/10">
                    <Link
                      href={`/events/${event.id}`}
                      className="group/link inline-flex h-9 w-full items-center justify-between rounded-lg bg-[#edf2e8] px-3 text-xs font-semibold text-[#214b38] transition-colors hover:bg-[#dfead7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39765e] dark:bg-[#294336] dark:text-[#e3eee1] dark:hover:bg-[#34523f]"
                    >
                      View event
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </section>
        )}

        {!isLoading && !errorMessage && visibleEvents.length > 0 && (
          <p className="mt-5 text-[10px] text-[#718078] dark:text-[#aebdb1]">
            You&apos;re on the list! Check each event for meeting details.
          </p>
        )}
      </div>
    </main>
  );
}
