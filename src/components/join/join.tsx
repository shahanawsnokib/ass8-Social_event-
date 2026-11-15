"use client"

import { CalendarDays, Mail, MapPin } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  getCommunityJoinedEventsUrl,
  getEventDateLabel,
  type CommunityEvent,
} from "@/lib/community-events";
import {
  fetchCommunityApi,
  getCommunityJoinedEventsForUser,
} from "@/lib/community-api-client";
import { Button } from '@base-ui/react';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/components/ui/toast';

function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const Join = ({event}: { event: CommunityEvent }) => {
   
    const {data: session} = authClient.useSession();
    const user = session?.user
    const [isJoining, setIsJoining] = useState(false);
    const [registeredJoinKey, setRegisteredJoinKey] = useState<string | null>(null);
    const [checkedJoinKey, setCheckedJoinKey] = useState<string | null>(null);
    const userEmail = user?.email;
    const currentJoinKey = userEmail ? `${userEmail}:${event.id}` : null;
    const hasJoined =
      currentJoinKey !== null && registeredJoinKey === currentJoinKey;
    const isCheckingJoin =
      currentJoinKey !== null && checkedJoinKey !== currentJoinKey;

    const isEventClosed = /^\d{4}-\d{2}-\d{2}$/.test(event.eventDate)
      && event.eventDate <= getLocalDateString();

    useEffect(() => {
      if (!userEmail) {
        return;
      }

      const activeEmail = userEmail;
      let isCurrent = true;
      const joinKey = `${activeEmail}:${event.id}`;

      async function checkJoinedStatus() {
        try {
          const joinedEvents =
            await getCommunityJoinedEventsForUser(activeEmail);
          const alreadyJoined = joinedEvents.some(
            (joinedEvent) => joinedEvent.id === event.id,
          );

          if (isCurrent) {
            setRegisteredJoinKey(alreadyJoined ? joinKey : null);
            setCheckedJoinKey(joinKey);
          }
        } catch (error) {
          console.error("Could not check joined events:", error);
          if (isCurrent) {
            setCheckedJoinKey(joinKey);
            toast.add({
              title: "Could not check event registration",
              description: "The event server may be unavailable. Please try again.",
              type: "error",
            });
          }
        }
      }

      void checkJoinedStatus();

      return () => {
        isCurrent = false;
      };
    }, [event.id, userEmail]);

const handleJoin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (isEventClosed || hasJoined || isCheckingJoin) {
          return;
        }

        if (!user) {
          toast.add({
            title: "Sign in to join",
            description: "You need to sign in before joining this event.",
            type: "error",
          });
          return;
        }

        setIsJoining(true);
        try {
          const response = await fetchCommunityApi(getCommunityJoinedEventsUrl(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId: event.id }),
          });

          if (!response.ok) {
            throw new Error(`Join request failed (HTTP ${response.status}).`);
          }

          setRegisteredJoinKey(currentJoinKey);
          toast.add({
            title: "You joined the event",
            description: `You are now signed up for ${event.title}.`,
            type: "success",
          });
        } catch (error) {
          console.error("Could not join event:", error);
          toast.add({
            title: "Could not join event",
            description: "The event server may be unavailable. Please try again.",
            type: "error",
          });
        } finally {
          setIsJoining(false);
        }
}

    return (
        <div>
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
                    <dd className="mt-1 text-sm font-medium">
                      {event.location}
                    </dd>
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
               <div className="mx-auto my-6 flex max-w-lg flex-col gap-3 sm:flex-row">
                {isEventClosed && (
                  <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
                    This event is already closed.
                  </p>
                )}
                {hasJoined && (
                  <p role="status" className="text-sm font-medium text-green-800 dark:text-green-300">
                    You have already joined this event.
                  </p>
                )}
                {/* Join Now */}
                <Button onClick={handleJoin} disabled={isEventClosed || hasJoined || isCheckingJoin || isJoining}
               
                  className="rounded-lg bg-green-800 px-5 py-3 text-center font-medium text-white hover:bg-green-900"
                >
                 <p>
                     {isEventClosed
                       ? "Event Closed"
                       : hasJoined
                         ? "Already Joined"
                         : isCheckingJoin || isJoining
                         ? "Joining..."
                         : "Join Now"}
                 </p>
                </Button>
              </div>
            </aside>
        </div>
    );
};

export default Join;