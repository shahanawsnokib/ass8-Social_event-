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

const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000")
  .replace(/\/+$/, "");

export function getCommunityEventUrl(id: string) {
  return `${apiUrl}/events/${encodeURIComponent(id)}`;
}

export function getCommunityEventsUrl() {
  return `${apiUrl}/events`;
}

export function getCommunityEventCreateUrl() {
  return `${apiUrl}/create-event`;
}

// Shared endpoint for checking and submitting event registrations.
export function getCommunityJoinedEventsUrl() {
  return `${apiUrl}/joined`;
}

export function getCommunityJoinedEventsForUserUrl(email: string) {
  return `${getCommunityJoinedEventsUrl()}/${encodeURIComponent(email)}`;
}

export function getCommunityJoinedEventUrl(joinedRecordId: string) {
  return `${getCommunityJoinedEventsUrl()}/${encodeURIComponent(joinedRecordId)}`;
}

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

  const id = getEventId(value._id ?? value.id);
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

function getJoinedRecords(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const records = payload.joinedEvents ?? payload.joined ?? payload.data;

  return Array.isArray(records) ? records.filter(isRecord) : [];
}

function normalizeJoinedEvent(value: Record<string, unknown>): CommunityEvent | null {
  const id = getEventId(value.eventId ?? value.id);
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

export async function getCommunityJoinedEventsForUser(
  email: string,
): Promise<CommunityEvent[]> {
  const response = await fetch(getCommunityJoinedEventsUrl(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not load joined events (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("The joined-events endpoint returned a non-JSON response.");
  }

  const payload: unknown = await response.json();

  return getJoinedRecords(payload)
    .filter((record) => (record.email ?? record.userEmail) === email)
    .map(normalizeJoinedEvent)
    .filter((event): event is CommunityEvent => event !== null)
    .sort((first, second) => first.eventDate.localeCompare(second.eventDate));
}

export async function getCommunityEvents(): Promise<CommunityEvent[]> {
  const response = await fetch(getCommunityEventsUrl());

  if (!response.ok) {
    throw new Error(`Could not load events (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("The events endpoint returned a non-JSON response.");
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
