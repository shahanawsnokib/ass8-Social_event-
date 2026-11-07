"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import {
  getCommunityEventById,
  getEventDateLabel,
  type CommunityEvent,
} from "@/lib/community-events";

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const foundEvent = await getCommunityEventById(eventId);
        setEvent(foundEvent);
      } catch (error) {
        console.error("Could not load event details:", error);
        setErrorMessage(
          "We couldn't load this event. Check that the event server is running, then try again.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  return (
    <main className="flex-1 bg-[#f7f8f1] px-5 py-8 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:py-12">
      <article className="mx-auto max-w-[760px]">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#52675d] transition-colors hover:text-[#193b32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39765e] dark:text-[#c7d5c9] dark:hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All upcoming events
        </Link>

        {isLoading ? (
          <p className="mt-6 text-sm text-[#718078] dark:text-[#aebdb1]" role="status">
            Loading event details...
          </p>
        ) : errorMessage ? (
          <p
            className="mt-6 rounded-xl border border-[#dd704b]/25 bg-[#fff4ed] p-4 text-sm text-[#8a4935] dark:bg-[#3b2822] dark:text-[#ffd5c4]"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : !event ? (
          <div className="mt-6 rounded-xl bg-white p-5 dark:bg-[#1b2d26]">
            <h1 className="text-xl font-semibold">Event not found</h1>
            <p className="mt-2 text-sm text-[#657168] dark:text-[#b2c4b5]">
              This event may have been removed or the link may be incorrect.
            </p>
          </div>
        ) : (
          <>
            <div className="relative mt-5 flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-[#18513e] p-6 text-[#fffaf0] sm:min-h-72 sm:p-9">
              {event.thumbnailUrl && (
                <Image
                  src={event.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 760px"
                  unoptimized
                  onError={(imageEvent) => {
                    imageEvent.currentTarget.style.display = "none";
                  }}
                  className="object-cover opacity-25"
                />
              )}
              <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.16em]">
                {event.eventType}
              </p>
              <h1 className="relative z-10 mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl">
                {event.title}
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-[#193b32]/10 bg-white p-5 dark:border-white/10 dark:bg-[#1b2d26] sm:p-7">
              <h2 className="text-sm font-semibold">About this event</h2>
              <p className="mt-2 text-sm leading-6 text-[#657168] dark:text-[#b2c4b5]">
                {event.description || "More event details will be shared soon."}
              </p>
              <div className="mt-5 flex flex-col gap-3 border-t border-[#193b32]/10 pt-5 text-xs text-[#52675d] dark:border-white/10 dark:text-[#c7d5c9] sm:flex-row sm:gap-8">
                <p className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="size-4 text-[#7d9672]" />
                  {event.location}
                </p>
                <p className="inline-flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="size-4 text-[#7d9672]" />
                  {getEventDateLabel(event.eventDate)}
                </p>
              </div>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
