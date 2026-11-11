"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HandHeart,
  ImagePlus,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRequirements = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
  ];

  const signUpHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const photoUrl = formData.get("photoUrl")?.toString().trim();

    if (password !== confirmPassword) {
      setMessage("Your passwords don’t match. Check them and try again.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Better Auth expects "image"; the confirmation password is only for client-side validation.
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(photoUrl ? { image: photoUrl } : {}),
      });

      if (error) {
        setMessage(error.message || "Unable to create your account. Please try again.");
        console.log(error);
        
        return;
      }

      if(data){
        console.log(data);
        
      }

      if (!data) {
        setMessage("Unable to create your account. Please try again.");
        return;
      }

      setMessage("Your account was created successfully.");
    } catch {
      setMessage("Unable to reach the sign-up service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center bg-[#f7f8f1] px-4 py-8 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-[1080px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-36px_rgba(25,59,50,0.3)] ring-1 ring-[#193b32]/[0.07] dark:bg-[#1b2d26] dark:ring-white/10 md:grid-cols-[0.92fr_1.08fr]">
        <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#173c34] p-7 text-[#fffaf0] sm:p-10 md:min-h-[700px] md:p-12">
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
              There’s room for you here
            </span>
            <h1 className="mt-5 max-w-sm text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[40px]">
              Your next good turn starts with hello.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#fffaf0]/70">
              Meet nearby volunteers and discover small ways to make a lasting
              difference in your community.
            </p>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm sm:p-5 md:mt-0">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#dceeb1] text-[#214b38]">
                <UsersRound aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold">Good things happen together</p>
                <p className="mt-1 text-[11px] leading-5 text-[#fffaf0]/65">
                  From neighborhood cleanups to donation drives, every helping
                  hand makes a difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center px-6 py-9 sm:px-10 sm:py-12 md:px-12">
          <div className="mx-auto w-full max-w-[390px]">
            <div className="mb-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#edf2e8] text-[#315d49] dark:bg-[#294336] dark:text-[#dceeb1]">
                <HandHeart aria-hidden="true" className="size-5" />
              </span>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
                Join your neighbors
              </p>
              <h2 className="mt-1.5 text-3xl font-semibold tracking-[-0.055em]">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#718078] dark:text-[#aebdb1]">
                A few details and you’re ready to do good.
              </p>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setMessage("Google sign-up is not connected in this frontend preview.")
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
                  setMessage("GitHub sign-up is not connected in this frontend preview.")
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

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e6e9e1] dark:bg-white/10" />
              <span className="text-[10px] font-medium text-[#89958b]">
                or sign up with email
              </span>
              <span className="h-px flex-1 bg-[#e6e9e1] dark:bg-white/10" />
            </div>







            <form onSubmit={signUpHandler} className="space-y-3.5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                >
                  Your name
                </label>
                <div className="relative">
                  <UserRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Ayesha Rahman"
                    required
                    className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                </div>
              </div>

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
                    className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="photoUrl"
                  className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                >
                  Profile photo URL
                </label>
                <div className="relative">
                  <ImagePlus
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="photoUrl"
                    name="photoUrl"
                    type="url"
                    autoComplete="url"
                    placeholder="https://example.com/your-photo.jpg"
                    className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    minLength={6}
                    pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Use at least 6 characters, including one uppercase and one lowercase letter."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-12 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
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
                <ul
                  aria-label="Password requirements"
                  className="mt-2 flex flex-wrap gap-x-3 gap-y-1"
                >
                  {passwordRequirements.map((requirement) => (
                    <li
                      key={requirement.label}
                      className={`text-[9px] ${
                        requirement.met
                          ? "font-medium text-[#39765e] dark:text-[#dceeb1]"
                          : "text-[#89958b] dark:text-[#aebdb1]"
                      }`}
                    >
                      <span aria-hidden="true">
                        {requirement.met ? "✓" : "○"}{" "}
                      </span>
                      {requirement.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-xs font-semibold text-[#37453c] dark:text-[#d8e2d8]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#87958a]"
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    className="h-11 rounded-xl border-[#dfe4dc] bg-white pl-10 pr-4 text-sm text-[#263b31] placeholder:text-[#9aa59c] focus-visible:border-[#54836c] focus-visible:ring-[#54836c]/15 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#214b38] text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(25,59,50,0.7)] transition-all hover:bg-[#173c34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] active:translate-y-px dark:bg-[#dceeb1] dark:text-[#214b38] dark:hover:bg-[#e8f4c8]"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
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

            <div className="mt-5 flex items-start gap-2.5 border-t border-[#e6e9e1] pt-4 dark:border-white/10">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#78956e]"
              />
              <p className="text-[10px] leading-5 text-[#89958b] dark:text-[#aebdb1]">
                Your details are used to set up your Goodturn account. Keep your
                password private.
              </p>
            </div>

            <p className="mt-5 text-center text-xs text-[#718078] dark:text-[#aebdb1]">
              Already part of Goodturn?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#315d49] underline decoration-[#a8b99c] underline-offset-4 transition-colors hover:text-[#173c34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54836c] dark:text-[#dceeb1] dark:hover:text-white"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
