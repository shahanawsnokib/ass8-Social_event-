import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, MapPin } from "lucide-react";
import {
  getEventDateLabel,
  type CommunityEvent,
} from "@/lib/community-events";
import { notFound } from "next/navigation";
import EditEventDetails from "@/components/ui/editEvenetDetails";
import EventDetailImage from "@/components/ui/events/event-detail-image";

type EventDetailsPageProps = {
  // Next.js gives this page the value from the [id] part of the URL.
  // For example, /events/123 passes "123" as params.id.
  params: Promise<{ id: string }>;
};

// API data is untrusted, so first check that a value is an object.
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Check the API response and give the page safe, consistently typed event data.
function normalizeEvent(value: unknown): CommunityEvent | null {
  if (!isRecord(value)) {
    return null;
  }

  // MongoDB may return its ID as a string or as an object containing "$oid".
  const rawId = value._id;
  const id =
    typeof rawId === "string"
      ? rawId
      : isRecord(rawId) && typeof rawId.$oid === "string"
        ? rawId.$oid
        : "";

  if (!id) {
    return null;
  }

  return {
    id,
    title: typeof value.title === "string" ? value.title : "Community event",
    description: typeof value.description === "string" ? value.description : "",
    eventType: typeof value.eventType === "string" ? value.eventType : "Community",
    eventDate: typeof value.eventDate === "string" ? value.eventDate : "",
    thumbnailUrl: typeof value.thumbnailUrl === "string" ? value.thumbnailUrl : "",
    location:
      typeof value.location === "string"
        ? value.location
        : "Location to be announced",
    organizerEmail:
      typeof value.organizerEmail === "string" ? value.organizerEmail : "",
  };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  // Read the ID from the URL before requesting this specific event.
  const { id } = await params;
  let event: CommunityEvent | null = null;

  // MongoDB ObjectIds are 24 hexadecimal characters. Reject invalid URLs early.
  if (!/^[\da-f]{24}$/i.test(id)) {
    notFound();
  }

  try {
    // Send the request from the server directly to the API's event-by-ID route.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:5000/events/${id}`;
    const response = await fetch(
      `${apiUrl}`,
      { cache: "no-store" },
    );

    // A 404 means the ID was valid but the API did not find that event.
    // Other unsuccessful responses are treated as errors and shown below.
    if (response.status !== 404 && !response.ok) {
      throw new Error(`Could not load event details (HTTP ${response.status}).`);
    }

    if (response.ok) {
      // Read the response as text first because the API can return an empty body
      // when an event does not exist.
      const responseBody = await response.text();

      if (responseBody.trim()) {
        let payload: unknown;

        // Convert the JSON text from the API into JavaScript data.
        try {
          payload = JSON.parse(responseBody);
        } catch {
          throw new Error("The event server returned invalid event data.");
        }

        // Support both a direct event response and common wrapped responses:
        // { event: ... } or { data: ... }.
        let eventRecord = payload;
        if (isRecord(payload)) {
          if (isRecord(payload.event)) {
            eventRecord = payload.event;
          } else if (isRecord(payload.data)) {
            eventRecord = payload.data;
          }
        }

        event = normalizeEvent(eventRecord);
      }
    }
  } catch (error) {
    // Keep the technical error in the server logs and show a helpful message
    // to visitors instead of crashing the page.
    console.error("Could not load event details:", error);

    return (
      <main className="flex flex-1 items-center bg-[#f7f8f1] px-5 py-16 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-8 shadow-sm dark:bg-[#1b2d26] sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
            Event details
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            We couldn&apos;t load this event
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#718078] dark:text-[#aebdb1]">
            The event server may be unavailable right now. Please try again in a
            moment, or return to the events list.
          </p>
          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#214b38] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#193b32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39765e]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  // Show Next.js's not-found page if the API returned no event or unusable data.
  if (!event) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f7f8f1] px-5 py-8 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:py-12">
      <article className="mx-auto max-w-[1080px]">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#52735e] transition-colors hover:text-[#193b32] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39765e] dark:text-[#a9c5ad] dark:hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All community events
        </Link>

        {/* The large image area introduces the event and shows its main details. */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_16px_50px_-28px_rgba(25,59,50,0.3)] ring-1 ring-[#193b32]/[0.07] dark:bg-[#1b2d26] dark:ring-white/10">
          <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-[#315d49] via-[#78956e] to-[#d1bd8b] sm:min-h-[420px]">
            <EventDetailImage src={event.thumbnailUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102c22]/90 via-[#102c22]/25 to-[#102c22]/5" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <span className="inline-flex rounded-full border border-white/30 bg-[#fffdf7]/95 px-3 py-1 text-xs font-semibold text-[#28513f] shadow-sm">
                {event.eventType}
              </span>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                {event.title}
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/90">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {event.location}
              </p>
            </div>

            <div className="relative z-10 my-5 mx-4 flex justify-between">
              <EditEventDetails event={event} />
            </div>
          </div>

          {/* Put the full description beside the quick-reference information. */}
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section aria-labelledby="about-event">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
                Make a difference together
              </p>
              <h2
                id="about-event"
                className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
              >
                About this event
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#65736a] dark:text-[#c0cdc2]">
                {event.description || "More information about this event will be shared soon."}
              </p>
            </section>

            <aside
              aria-label="Event information"
              className="h-fit rounded-2xl bg-[#f4f6ef] p-5 dark:bg-[#14241f]"
            >
              <h2 className="text-sm font-semibold">Event information</h2>
              <dl className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <CalendarDays
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                  />
                  <div>
                    <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                      Date
                    </dt>
                    <dd className="mt-1 text-sm font-medium">
                      {getEventDateLabel(event.eventDate)}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                  />
                  <div>
                    <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{event.location}</dd>
                  </div>
                </div>
                {event.organizerEmail && (
                  <div className="flex gap-3">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                    />
                    <div className="min-w-0">
                      <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                        Organizer
                      </dt>
                      <dd className="mt-1 break-all text-sm font-medium">
                        <a
                          href={`mailto:${event.organizerEmail}`}
                          className="underline decoration-[#52735e]/40 underline-offset-4 hover:text-[#52735e] dark:hover:text-[#a9c5ad]"
                        >
                          {event.organizerEmail}
                        </a>
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}