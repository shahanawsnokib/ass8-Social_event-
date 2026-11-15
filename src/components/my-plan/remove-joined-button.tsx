"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getCommunityJoinedEventUrl } from "@/lib/community-events";

type RemoveJoinedButtonProps = {
  joinedRecordId: string;
  eventTitle: string;
};

export default function RemoveJoinedButton({
  joinedRecordId,
  eventTitle,
}: RemoveJoinedButtonProps) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemove() {
    if (!joinedRecordId) {
      toast.add({
        title: "Unable to remove event",
        description: "The joined-event record is missing its ID.",
        type: "error",
      });
      return;
    }

    setIsRemoving(true);
    try {
      // Use the joined-record ID so this removes the registration, not the event.
      const response = await fetch(
        getCommunityJoinedEventUrl(joinedRecordId),
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(`Remove request failed (HTTP ${response.status}).`);
      }

      toast.add({
        title: "Event removed",
        description: `${eventTitle} was removed from your plan.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Could not remove joined event:", error);
      toast.add({
        title: "Could not remove event",
        description: "The event server may be unavailable. Please try again.",
        type: "error",
      });
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            disabled={!joinedRecordId || isRemoving}
          />
        }
      >
        <Trash2 aria-hidden="true" />
        Remove
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this event from your plan?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove your registration for {eventTitle}. It will not
            delete the community event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep event</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
