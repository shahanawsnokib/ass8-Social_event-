export type CommunityEvent = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  thumbnailUrl: string;
  location: string;
  organizerEmail: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getEventId(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (isRecord(value) && typeof value.$oid === "string") {
    return value.$oid;
  }

  return "";
}

function normalizeEvent(value: unknown): CommunityEvent | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = getEventId(value._id);
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
    location: typeof value.location === "string" ? value.location : "Location to be announced",
    organizerEmail: typeof value.organizerEmail === "string" ? value.organizerEmail : "",
  };
}

function getEventRecords(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  if (Array.isArray(payload.events)) {
    return payload.events;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [payload];
}

export async function getCommunityEvents(): Promise<CommunityEvent[]> {
  const response = await fetch(`${apiUrl}/events`);

  if (!response.ok) {
    throw new Error(`Could not load events (HTTP ${response.status}).`);
  }

  const payload: unknown = await response.json();

  return getEventRecords(payload)
    .map(normalizeEvent)
    .filter((event): event is CommunityEvent => event !== null);
}

export function getEventDateLabel(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (!match) {
    return date || "Date to be announced";
  }

  const [, year, month, day] = match;
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}
