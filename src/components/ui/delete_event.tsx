"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import {
  getCommunityEventUrl,
  type CommunityEvent,
} from "@/lib/community-events";
import { Button } from "./button";
import { fetchCommunityApi } from "@/lib/community-api-client";
import { toast } from "@/components/ui/toast";

type DeleteEventProps = {
  event: CommunityEvent;
  onDeleted?: () => void;
};

const DeleteEventButton = ({ event, onDeleted }: DeleteEventProps) => {
  const id = event.id;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetchCommunityApi(getCommunityEventUrl(id), {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed (HTTP ${res.status}).`);
      }

      toast.add({
        title: "Event deleted",
        description: "The event has been removed.",
        type: "success",
      });
      if (onDeleted) {
        onDeleted();
      } else {
        router.push("/events");
      }
    } catch (error) {
      console.error("Could not delete event:", error);
      toast.add({
        title: "Could not delete event",
        description: "The server could not delete this event. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button className="rounded-lg bg-red-400 px-5 py-3 text-center font-medium text-white hover:bg-red-600" />}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure? {id}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {event.title} event will be
            permanently deleted from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventButton;