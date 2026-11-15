import Link from "next/link";
import { CalendarDays, Mail, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileEditor from "@/components/profile/profile-editor";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const name = user.name || "Goodturn member";
  const initial = name.charAt(0).toUpperCase();
  const memberSince = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <main className="flex-1 bg-[#f7f8f1] px-4 py-10 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Your Goodturn account
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Profile</h1>

        <section className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1b2d26] sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Avatar size="lg" className="size-20">
              <AvatarImage
                src={user.image ?? undefined}
                alt={`${name}'s profile picture`}
              />
              <AvatarFallback className="bg-[#dceeb1] text-2xl font-semibold text-[#193b32]">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-semibold">{name}</h2>
              <p className="mt-1 break-all text-sm text-[#718078] dark:text-[#aebdb1]">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-[#e5e9df] pt-6 dark:border-white/10">
            <h3 className="text-sm font-semibold">Account information</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-[#f7f8f1] p-4 dark:bg-[#14241f]">
                <UserRound
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                />
                <div className="min-w-0">
                  <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                    Name
                  </dt>
                  <dd className="mt-1 break-words text-sm font-medium">{name}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-[#f7f8f1] p-4 dark:bg-[#14241f]">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                />
                <div className="min-w-0">
                  <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                    Email
                  </dt>
                  <dd className="mt-1 break-all text-sm font-medium">
                    {user.email}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-[#f7f8f1] p-4 dark:bg-[#14241f] sm:col-span-2">
                <CalendarDays
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#52735e] dark:text-[#a9c5ad]"
                />
                <div>
                  <dt className="text-xs text-[#718078] dark:text-[#aebdb1]">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{memberSince}</dd>
                </div>
              </div>
            </dl>
          </div>

          <ProfileEditor
            initialName={user.name}
            initialImage={user.image ?? ""}
          />

          <Link
            href="/my-plan"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#214b38] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#193b32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e]"
          >
            View my plan
          </Link>
        </section>
      </div>
    </main>
  );
}
