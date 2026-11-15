"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileEditor({
  initialName,
  initialImage,
}: {
  initialName: string;
  initialImage: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.add({
        title: "Profile updated",
        description: "Your profile details have been saved.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Could not update profile:", error);
      toast.add({
        title: "Could not update profile",
        description: "Check your details and try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-[#e5e9df] pt-6 dark:border-white/10">
      <h3 className="text-sm font-semibold">Edit your profile</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#718078] dark:text-[#aebdb1]">
          Name
          <Input
            className="mt-1.5 h-11 text-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={100}
          />
        </label>
        <label className="text-xs font-medium text-[#718078] dark:text-[#aebdb1]">
          Profile photo URL
          <Input
            className="mt-1.5 h-11 text-sm"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div>
      <Button className="mt-5" type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
