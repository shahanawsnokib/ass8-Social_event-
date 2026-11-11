"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, HandHeart, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type ResetPasswordFormProps = {
  token: string;
  hasInvalidToken: boolean;
};

export default function ResetPasswordForm({
  token,
  hasInvalidToken,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(
    hasInvalidToken ? "This reset link is invalid or has expired. Request a new one." : "",
  );
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (!token) {
      setMessage("This reset link is missing its token. Request a new one.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Your passwords don’t match. Check them and try again.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // The token comes from the secure link sent to the user's email.
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        setMessage(error.message || "Unable to reset your password. Request a new link.");
        return;
      }

      setIsComplete(true);
      setMessage("Your password has been reset. You can now sign in.");
    } catch {
      setMessage("Unable to reach the password reset service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f7f8f1] px-4 py-10 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef]">
      <section className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-[0_24px_80px_-36px_rgba(25,59,50,0.3)] ring-1 ring-[#193b32]/[0.07] dark:bg-[#1b2d26] dark:ring-white/10 sm:p-10">
        <Link
          href="/"
          aria-label="Goodturn home"
          className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#edf2e8] text-[#315d49] dark:bg-[#294336] dark:text-[#dceeb1]"
        >
          <HandHeart aria-hidden="true" className="size-5" />
        </Link>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Account help
        </p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-[-0.055em]">
          Choose a new password
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#718078] dark:text-[#aebdb1]">
          Use at least 6 characters, including one uppercase and one lowercase
          letter.
        </p>

        {!isComplete && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
              >
                New password
              </label>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Use at least 6 characters, including one uppercase and one lowercase letter."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
              >
                Confirm new password
              </label>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || hasInvalidToken || !token}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#214b38] text-sm font-semibold text-white transition-colors hover:bg-[#173c34] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#dceeb1] dark:text-[#214b38] dark:hover:bg-[#e8f4c8]"
            >
              {isSubmitting ? "Saving password..." : "Save new password"}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </form>
        )}

        {message && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-[#d7e3d3] bg-[#f1f6ed] px-3.5 py-3 text-xs leading-5 text-[#315d49] dark:border-white/10 dark:bg-[#294336] dark:text-[#dceeb1]"
          >
            {message}
          </p>
        )}

        <p className="mt-5 text-center text-xs text-[#718078] dark:text-[#aebdb1]">
          <Link
            href="/login"
            className="font-semibold text-[#315d49] underline decoration-[#a8b99c] underline-offset-4 hover:text-[#173c34] dark:text-[#dceeb1] dark:hover:text-white"
          >
            Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
