
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HandHeart } from "lucide-react";
import {
  getCommunityEvents,
  getEventDateLabel,
  type CommunityEvent,
} from "@/lib/community-events";

type EventsPageProps = {
  limit?: number;
};

export default function EventsPage({ limit }: EventsPageProps) {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getCommunityEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show limited events if limit is provided
  const displayedEvents = limit ? events.slice(0, limit) : events;

  return (
    <main className="min-h-screen bg-[#f7f8f1] px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-green-900">
          Upcoming Community Events
        </h1>

        <p className="mt-2 text-gray-600">
          Join local events and make a difference in your community.
        </p>

        {/* Loading */}
        {loading && (
          <p className="mt-6 text-gray-500">Loading events...</p>
        )}

        {/* Error */}
        {error && (
          <p className="mt-6 text-red-500">{error}</p>
        )}

        {/* No Events */}
        {!loading && !error && displayedEvents.length === 0 && (
          <p className="mt-6 text-gray-500">
            No events available.
          </p>
        )}

        {/* Event Cards */}
        {!loading && !error && displayedEvents.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-xl bg-white shadow-md"
              >
                {/* Keep a branded image fallback visible if a thumbnail is missing or unavailable. */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#315d49] via-[#78956e] to-[#d1bd8b]">
                  <div
                    aria-hidden="true"
                    className="flex flex-col items-center gap-2 text-[#fffaf0]/90"
                  >
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm">
                      <HandHeart className="size-7" strokeWidth={1.5} />
                    </span>
                    <span className="text-xs font-medium tracking-wide">
                      {event.eventType || "Community event"}
                    </span>
                  </div>
                  {event.thumbnailUrl.trim() && (
                  <Image
                    src={event.thumbnailUrl.trim()}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    loading="lazy"
                    onError={(imageEvent) => {
                      imageEvent.currentTarget.style.display = "none";
                    }}
                    className="object-cover"
                  />
                  )}
                </div>

                {/* Event Information */}
                <div className="p-5">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-gray-800">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <p className="mt-4 text-sm text-gray-600">
                    📅 {getEventDateLabel(event.eventDate)}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    📍 {event.location}
                  </p>

                  {/* View Event Button */}
                  <Link
                    href={`/events/${event.id}`}
                    className="mt-5 block rounded-lg bg-green-800 px-4 py-3 text-center text-sm font-medium text-white hover:bg-green-900"
                  >
                    View Event
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
