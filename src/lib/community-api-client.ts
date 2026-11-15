"use client";

import { authClient } from "@/lib/auth-client";
import {
  getCommunityJoinedEventsForUserUrl,
  normalizeCommunityJoinedEvents,
} from "@/lib/community-events";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function fetchCommunityApi(
  url: string,
  init: RequestInit = {},
) {
  const { data, error } = await authClient.$fetch("/token", {
    method: "GET",
  });

  if (error || !isRecord(data) || typeof data.token !== "string") {
    throw new Error("Sign in again before continuing.");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${data.token}`);

  return fetch(url, { ...init, headers });
}

export async function getCommunityJoinedEventsForUser(email: string) {
  const response = await fetchCommunityApi(
    getCommunityJoinedEventsForUserUrl(email),
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Could not load joined events (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("The joined-events endpoint returned a non-JSON response.");
  }

  return normalizeCommunityJoinedEvents(await response.json(), email);
}
