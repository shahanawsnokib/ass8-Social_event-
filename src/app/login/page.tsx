"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HandHeart,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setMessage(
      "This sign-in screen is a frontend preview. Authentication is not connected yet.",
    );
  }

  return (
    <main className="flex flex-1 items-center bg-[#f7f8f1] px-4 py-8 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-[1080px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-36px_rgba(25,59,50,0.3)] ring-1 ring-[#193b32]/[0.07] dark:bg-[#1b2d26] dark:ring-white/10 md:grid-cols-[0.92fr_1.08fr]">
        <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#173c34] p-7 text-[#fffaf0] sm:p-10 md:min-h-[620px] md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-20 size-80 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(240,163,110,0.28),rgba(240,163,110,0)_68%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 -left-32 size-96 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(220,238,177,0.18),rgba(220,238,177,0)_68%)]"
          />

          <Link
            href="/"
            aria-label="Goodturn home"
            className="relative inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#f0a36e] text-[#173c34]">
              <HandHeart aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </span>
            <span className="text-[20px] font-semibold tracking-[-0.06em]">
              goodturn<span className="text-[#f0a36e]">.</span>
            </span>
          </Link>

          <div className="relative mt-10 max-w-md md:mt-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#dceeb1]">
              <Leaf aria-hidden="true" className="size-3.5" />
              Neighbors in action
            </span>
            <h1 className="mt-5 max-w-sm text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[40px]">
              Good things grow when we show up.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#fffaf0]/70">
              Find your people, lend a hand, and make your corner of the
              community a little brighter.
            </p>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm sm:p-5 md:mt-0">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#dceeb1] text-[#214b38]">
                <UsersRound aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold">A little help goes a long way</p>
                <p className="mt-1 text-[11px] leading-5 text-[#fffaf0]/65">
                  Join local cleanups, donation drives, and neighbors making
                  change together.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div className="flex -space-x-2" aria-label="Community volunteers">
                {["S", "A", "R", "M"].map((initial, index) => (
                  <span
                    key={initial}
                    className={`flex size-7 items-center justify-center rounded-full border-2 border-[#285044] text-[9px] font-semibold text-[#173c34] ${
                      ["bg-[#f0a36e]", "bg-[#dceeb1]", "bg-[#f4d9b8]", "bg-[#c3d6c1]"][index]
                    }`}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-medium text-[#fffaf0]/60">
                Small acts. Stronger neighborhoods.
              </span>
            </div>
          </div>
        </section>

        <section className="flex items-center px-6 py-9 sm:px-10 sm:py-12 md:px-12">
          <div className="mx-auto w-full max-w-[390px]">
            <div className="mb-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#edf2e8] text-[#315d49] dark:bg-[#294336] dark:text-[#dceeb1]">
                <HandHeart aria-hidden="true" className="size-5" />
              </span>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
                Welcome back
              </p>
              <h2 className="mt-1.5 text-3xl font-semibold tracking-[-0.055em]">
                Sign in to Goodturn
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#718078] dark:text-[#aebdb1]">
                Your community is glad you’re here.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setMessage("Google sign-in is not connected in this frontend preview.")
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe4dc] bg-white text-xs font-semibold text-[#263b31] transition-colors hover:bg-[#f7f8f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54836c] dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec] dark:hover:bg-[#294336]"
              >
                <span aria-hidden="true" className="text-base font-bold text-[#4285f4]">
                  G
                </span>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() =>
                  setMessage("GitHub sign-in is not connected in this frontend preview.")
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe4dc] bg-white text-xs font-semibold text-[#263b31] transition-colors hover:bg-[#f7f8f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54836c] dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec] dark:hover:bg-[#294336]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center rounded-full bg-[#263b31] text-[8px] font-bold text-white dark:bg-[#eef3ec] dark:text-[#1d3029]"
                >
                  GH
                </span>
                Continue with GitHub
              </button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e6e9e1] dark:bg-white/10" />
              <span className="text-[10px] font-medium text-[#89958b]">
                or sign in with email
              </span>
              <span className="h-px flex-1 bg-[#e6e9e1] dark:bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="h-12 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-12 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                  <button
                    type="button"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    aria-pressed={isPasswordVisible}
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#718078] transition-colors hover:bg-[#edf2e8] hover:text-[#315d49] focus-visible:outline-2 focus-visible:outline-[#54836c] dark:text-[#aebdb1] dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {isPasswordVisible ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-0.5">
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-[#647268] dark:text-[#b6c4b8]">
                  <input
                    type="checkbox"
                    name="remember"
                    className="size-3.5 accent-[#315d49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54836c]"
                  />
                  Keep me signed in
                </label>
              </div>

              <button
                type="submit"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#214b38] text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(25,59,50,0.7)] transition-all hover:bg-[#173c34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] active:translate-y-px dark:bg-[#dceeb1] dark:text-[#214b38] dark:hover:bg-[#e8f4c8]"
              >
                Sign in
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>

            {message && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-[#d7e3d3] bg-[#f1f6ed] px-3.5 py-3 text-xs leading-5 text-[#315d49] dark:border-white/10 dark:bg-[#294336] dark:text-[#dceeb1]"
              >
                {message}
              </p>
            )}

            <div className="mt-6 flex items-start gap-2.5 border-t border-[#e6e9e1] pt-5 dark:border-white/10">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#78956e]"
              />
              <p className="text-[10px] leading-5 text-[#89958b] dark:text-[#aebdb1]">
                Your details stay yours. We’re here to help neighbors come
                together, not fill your inbox.
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-[#718078] dark:text-[#aebdb1]">
              New to Goodturn?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-[#315d49] underline decoration-[#a8b99c] underline-offset-4 transition-colors hover:text-[#173c34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54836c] dark:text-[#dceeb1] dark:hover:text-white"
              >
                Sign-Up.
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}