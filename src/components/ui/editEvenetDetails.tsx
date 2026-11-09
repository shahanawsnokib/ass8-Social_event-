"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import type { CommunityEvent } from "@/lib/community-events";

const labelClassName =
  "mb-0.5 block text-[8px] leading-3 font-medium text-[#37453c] dark:text-[#d8e2d8]";

type EventFormData = Omit<CommunityEvent, "id">;

type EditEventDetailsProps = {
  event: CommunityEvent;
};

function toFormData(event: CommunityEvent): EventFormData {
  return {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    eventDate: event.eventDate,
    thumbnailUrl: event.thumbnailUrl,
    location: event.location,
    organizerEmail: event.organizerEmail,
  };
}

function getLocalDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function EditEventDetails({ event }: EditEventDetailsProps) {
  const router = useRouter();
  // The event details page passes its already-loaded event into this component.
  const [formData, setFormData] = useState(() => toFormData(event));
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(
    changeEvent: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = changeEvent.target;

    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();

    if (!submitEvent.currentTarget.reportValidity()) {
      toast.add({
        title: "Check the event details",
        description: "Complete all required fields with valid information.",
        type: "error",
      });
      return;
    }

    if (formData.eventDate <= getLocalDateString()) {
      toast.add({
        title: "Choose a future date",
        description: "The event date must be later than today.",
        type: "error",
      });
      return;
    }
    setIsSaving(true);
    try {
 const response = await fetch(
  `http://localhost:5000/events/${event.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
      );

      if (!response.ok) {
        throw new Error(`Event update failed (HTTP ${response.status}).`);
      }

      toast.add({
        title: "Event updated",
        description: "Your changes have been saved successfully.",
        type: "success",
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Could not update event:", error);
      toast.add({
        title: "Could not update event",
        description: "Check that the event server is available, then try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setFormData(toFormData(event));
    setIsOpen(false);
  }

  return (
    <>
      <Button
        className="bg-[#214b38] px-5 py-3 text-white hover:bg-[#193b32]"
        onClick={() => setIsOpen(true)}
      >
        Edit Event
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit event details</DialogTitle>
            <DialogDescription>
              Update and save the information for this community event.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClassName} htmlFor="edit-event-title">
                Event title
              </label>
              <Input
                id="edit-event-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className={labelClassName}
                htmlFor="edit-event-description"
              >
                Description
              </label>
              <Input
                id="edit-event-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="edit-event-type">
                  Event type
                </label>
                <select
                  className="h-10 w-full rounded-md border border-[#dfe4dc] bg-white px-3 text-sm text-[#263b31] dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  id="edit-event-type"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Tree planting">Tree planting</option>
                </select>
              </div>

              <div>
                <label className={labelClassName} htmlFor="edit-event-date">
                  Event date
                </label>
                <Input
                  id="edit-event-date"
                  name="eventDate"
                  type="date"
                  min={getLocalDateString()}
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className={labelClassName}
                htmlFor="edit-event-thumbnail"
              >
                Thumbnail image URL
              </label>
              <Input
                id="edit-event-thumbnail"
                name="thumbnailUrl"
                type="url"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="edit-event-location">
                Location
              </label>
              <Input
                id="edit-event-location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="edit-event-organizer">
                Organizer email
              </label>
              <Input
                id="edit-event-organizer"
                name="organizerEmail"
                type="email"
                value={formData.organizerEmail}
                readOnly
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
