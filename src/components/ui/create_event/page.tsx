"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const labelClassName =
  "mb-0.5 block text-[8px] leading-3 font-medium text-[#37453c] dark:text-[#d8e2d8]";

type EventFormData = {
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  thumbnailUrl: string;
  location: string;
  organizerEmail: string;
};

const initialFormData: EventFormData = {
  title: "",
  description: "",
  eventType: "Donation",
  eventDate: "2026-11-21",
  thumbnailUrl: "",
  location: "",
  organizerEmail: "ayesha@example.com",
};

function getLocalDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function CreateEventPage() {
  // This state object always contains the latest values from the form fields.
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    // Each field's `name` matches a key in formData (for example, "title").
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    // Update the form immediately and log the updated values on every edit.
    setFormData(updatedFormData);
    // console.log("Current form data:", updatedFormData);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate required fields and input types before sending the request.
    if (!event.currentTarget.reportValidity()) {
      toast.add({
        title: "Check the event details",
        description: "Complete all required fields with valid information.",
        type: "error",
      });
      return;
    }

    // Only send the form to the server if the selected date is in the future.
    if (formData.eventDate <= getLocalDateString()) {
      toast.add({
        title: "Choose a future date",
        description: "The event date must be later than today.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Event request failed with status ${response.status}`);
      }

      toast.add({
        title: "Event created",
        description: "Your event was sent to the server successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Could not publish event:", error);
      toast.add({
        title: "Could not create event",
        description: "Check that the event server is running, then try again.",
        type: "error",
      });
    }
  }

  function handleCancel() {
    setFormData(initialFormData);
  }

  return (
    <main className="min-h-[calc(100svh-2.5rem)] flex-1 bg-[#f7f8f1] px-4 pb-8 pt-7 text-[#203d32] dark:bg-[#14241f] dark:text-[#ecf2e9] sm:px-6 sm:pt-8">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.04em] text-[#315d49] dark:text-[#a9c5ad]">
          Your community, your initiative
        </p>
        <h1 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.045em]">
          Bring people together
        </h1>
        <p className="mt-2 text-[10px] text-[#718078] dark:text-[#aebdb1]">
          Create an opportunity for your neighbors to do something good.
        </p>

        <div className="mt-1 grid items-start gap-4 sm:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-2 bg-white p-4 dark:bg-[#1b2d26] sm:p-4"
          >
            <div>
              <label className={labelClassName} htmlFor="event-title">
                Event title
              </label>
              <Input
                id="event-title"
                name="title"
                type="text"
                placeholder="Give your event a clear, meaningful title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="event-description">
                Description
              </label>
              <Input
                id="event-description"
                name="description"
                type="text"
                placeholder="Tell volunteers what you will do and how they can help"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="event-type">
                  Event type
                </label>
                <select
                  className="h-5 w-full rounded-md border border-[#dfe4dc] bg-white px-2 text-[9px] text-[#263b31] outline-none focus-visible:border-[#54836c] focus-visible:ring-2 focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  id="event-type"
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
                <label className={labelClassName} htmlFor="event-date">
                  Event date
                </label>
                <Input
                  id="event-date"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClassName} htmlFor="thumbnail-url">
                Thumbnail image URL
              </label>
              <Input
                id="thumbnail-url"
                name="thumbnailUrl"
                type="url"
                placeholder="https://example.com/event.jpg"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="event-location">
                Location
              </label>
              <Input
                id="event-location"
                name="location"
                type="text"
                placeholder="Mirpur 10, Dhaka"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="organizer-email">
                Organizer email
              </label>
              <Input
                id="organizer-email"
                name="organizerEmail"
                type="email"
                value={formData.organizerEmail}
                readOnly
                required
              />
            </div>

            <p className="text-[9px] leading-4 text-[#7a877f] dark:text-[#aebdb1]">
              Choose a future date. All fields are required.
            </p>

            <div className="flex items-center gap-2">
              <Button
                className="h-6 rounded-md bg-[#174a3a] px-3 text-[9px] font-medium text-white hover:bg-[#21634d]"
                type="submit"
              >
                Publish event
              </Button>
              <Button
                className="h-6 rounded-md border border-[#839878] bg-[#dceeb1] px-4 text-[9px] font-medium text-[#314832] hover:bg-[#d0e49f]"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </Button>
            </div>

          </form>

          <aside className="bg-[#eaf0e7] p-3.5 text-[#284b3c] dark:bg-[#20382d] dark:text-[#e3eee1]">
            <h2 className="text-[13px] font-semibold tracking-[-0.02em]">
              Make it easy to say yes.
            </h2>
            <ol className="mt-1.5 space-y-1 text-[9px] leading-3">
              <li>
                <span className="mr-1.5 font-medium text-[#51735e] dark:text-[#a9c5ad]">01</span>
                Choose a clear title
              </li>
              <li>
                <span className="mr-1.5 font-medium text-[#51735e] dark:text-[#a9c5ad]">02</span>
                Describe the activity
              </li>
              <li>
                <span className="mr-1.5 font-medium text-[#51735e] dark:text-[#a9c5ad]">03</span>
                Share an exact meeting point
              </li>
              <li>
                <span className="mr-1.5 font-medium text-[#51735e] dark:text-[#a9c5ad]">04</span>
                Let people know what to bring
              </li>
            </ol>
            <p className="mt-1.5 text-[8px] leading-3 text-[#78887d] dark:text-[#b2c4b5]">
              After publishing, your event appears in Upcoming Events.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
