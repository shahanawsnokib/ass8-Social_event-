import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  HeartHandshake,
  Leaf,
  MapPin,
  Sparkles,
} from "lucide-react";

const impactAreas = [
  {
    icon: Leaf,
    title: "Care for shared places",
    description:
      "Neighborhood cleanups and planting days help make familiar streets, parks, and gathering spaces more welcoming for everyone.",
    label: "Cleaner, greener neighborhoods",
  },
  {
    icon: HandHeart,
    title: "Show up for neighbors",
    description:
      "Donation drives and community support events turn useful resources into practical help for people nearby.",
    label: "Support that reaches people",
  },
  {
    icon: HeartHandshake,
    title: "Build stronger connections",
    description:
      "When people work side by side, a one-day event can become the beginning of lasting trust and local collaboration.",
    label: "More connected communities",
  },
];

const waysToHelp = [
  {
    number: "01",
    title: "Find a cause close to home",
    description:
      "Browse upcoming community events and choose a project that matters to you.",
  },
  {
    number: "02",
    title: "Bring what you can",
    description:
      "Offer your time, a useful skill, or supplies requested by the event organizer.",
  },
  {
    number: "03",
    title: "Invite someone along",
    description:
      "A friend, family member, or neighbor can make a good turn go even further.",
  },
];

export default function ImpactPage() {
  return (
    <main className="flex-1 bg-[#f7f8f1] text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef]">
      <section className="relative isolate overflow-hidden bg-[#173c34] px-5 py-20 text-[#fffaf0] sm:px-8 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-20 -z-10 size-96 rounded-full bg-[#dceeb1]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-20 -z-10 size-96 rounded-full bg-[#f0a36e]/15 blur-3xl"
        />
        <div className="goodturn-enter mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-[#dceeb1]">
            <Sparkles aria-hidden="true" className="size-4" />
            Small acts. Stronger neighborhoods.
          </p>
          <h1 className="mt-7 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.055em] sm:text-6xl">
            Local action can make a lasting difference.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Goodturn brings neighbors together around the work that matters
            close to home—from caring for shared spaces to supporting one
            another when it counts.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#dceeb1] px-6 text-sm font-semibold text-[#253e31] transition-colors hover:bg-[#e8f4c8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
            >
              Explore upcoming events
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
            >
              Start a community event
            </Link>
          </div>
          <div className="mt-14 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-white/65">
            <MapPin aria-hidden="true" className="size-4 text-[#f0a36e]" />
            Rooted in local places. Powered by people who care.
          </div>
        </div>
      </section>

      <section
        aria-labelledby="impact-areas-heading"
        className="px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#52735e] uppercase dark:text-[#a9c5ad]">
              What community looks like
            </p>
            <h2
              id="impact-areas-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
            >
              Good things grow when we do them together.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#65736a] dark:text-[#c0cdc2] sm:text-base">
              Every neighborhood has its own needs and strengths. These are a
              few ways local people can turn care into visible, shared action.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {impactAreas.map(
              ({ icon: Icon, title, description, label }, index) => (
                <article
                  key={title}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="goodturn-enter group rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-[0_14px_40px_-32px_rgba(25,59,50,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none dark:border-white/10 dark:bg-[#1b2d26] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eaf0e7] text-[#28513f] dark:bg-white/10 dark:text-[#dceeb1]">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#98a49a]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-7 text-xs font-semibold tracking-wide text-[#52735e] dark:text-[#a9c5ad]">
                    {label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#65736a] dark:text-[#c0cdc2]">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="goodturn-enter mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-[#eaf0e7] p-6 dark:bg-[#1b2d26] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#52735e] uppercase dark:text-[#a9c5ad]">
              Your next good turn
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              It starts with showing up.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#65736a] dark:text-[#c0cdc2]">
              You don&apos;t need a big plan to make a difference. Choose one
              useful action, then build from there with your community.
            </p>
          </div>
          <ol className="space-y-5">
            {waysToHelp.map((step) => (
              <li
                key={step.number}
                className="flex gap-4 border-b border-[#d6dfd3] pb-5 last:border-0 last:pb-0 dark:border-white/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#173c34] text-xs font-semibold text-[#dceeb1]">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#65736a] dark:text-[#c0cdc2]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="goodturn-enter mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#173c34] p-7 text-[#fffaf0] sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#dceeb1] uppercase">
              Make it happen
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your neighborhood is a good place to start.
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f0a36e] px-5 text-sm font-semibold text-[#173c34] transition-colors hover:bg-[#f5b88e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Find your first event
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
