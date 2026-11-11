import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  HandHeart,
  MapPin,
  Sprout,
} from "lucide-react";

const sampleEvents = [
  {
    category: "WINTER CARE",
    title: "Winter clothes distribution",
    location: "Mirpur 10, Dhaka",
    tone: "bg-[#f3e4cb]",
    icon: HandHeart,
  },
  {
    category: "WARMTH DRIVE",
    title: "Blanket distribution",
    location: "Mohammadpur, Dhaka",
    tone: "bg-[#e4e8d8]",
    icon: Sprout,
  },
];

export default function Banner() {
  return (
    <section
      id="discover"
      aria-labelledby="banner-title"
      className="relative isolate overflow-hidden bg-[#f4f0e6] px-5 pb-16 pt-14 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 -z-10 size-[34rem] rounded-full bg-[#e5d9b8]/45 blur-[90px] dark:bg-[#78956e]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 -z-10 size-[32rem] rounded-full bg-[#d8e1cd]/60 blur-[100px] dark:bg-[#dceeb1]/[0.06]"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
        <div className="goodturn-enter relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#193b32]/15 bg-[#fffdf7]/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52675d] shadow-sm shadow-[#193b32]/[0.04] dark:border-white/15 dark:bg-white/5 dark:text-[#d3ded5]">
            <span className="size-2 rounded-full bg-[#dd704b]" />
            Dhaka community calendar
          </div>

          <h1
            id="banner-title"
            className="mt-7 max-w-[760px] text-[clamp(3.3rem,7.6vw,6.7rem)] font-semibold leading-[0.92] tracking-[-0.085em]"
          >
            Small acts.
            <span className="relative mt-1 block w-fit">
              Stronger neighborhoods.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1 -z-10 h-[0.16em] w-[97%] -rotate-2 rounded-full bg-[#e89a69] sm:-bottom-2"
              />
            </span>
          </h1>

          <p id="mission" className="mt-7 max-w-xl text-base leading-7 text-[#5f6c64] dark:text-[#c0cdc2] sm:text-lg sm:leading-8">
            Find hands-on ways to care for your community. Join a local drive, lend a few hours, and meet the neighbors making good things happen.
          </p>

          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <Link
              href="/events"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#193b32] px-6 text-sm font-semibold text-[#fffaf0] shadow-[0_12px_30px_-18px_rgba(25,59,50,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#dd704b]"
            >
              Explore upcoming events
              <ArrowUpRight aria-hidden="true" className="size-4 text-[#f0a36e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex h-14 items-center justify-center rounded-full px-5 text-sm font-semibold text-[#314c40] transition-colors hover:bg-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd704b] dark:text-[#dceeb1] dark:hover:bg-white/10"
            >
              Organize a drive
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#193b32]/15 pt-5 text-xs font-medium text-[#657168] dark:border-white/15 dark:text-[#c0cdc2]">
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-3.5 text-[#dd704b]" />
              Local to your neighborhood
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-3.5 text-[#dd704b]" />
              Made for showing up
            </span>
          </div>
        </div>

        <div className="goodturn-enter goodturn-enter-late relative mx-auto flex min-h-[420px] w-full max-w-[590px] items-center justify-center sm:min-h-[520px] lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#193b32]/20 dark:border-white/15"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#193b32]/10 dark:border-white/10"
          />
          <div aria-hidden="true" className="absolute left-[8%] top-[23%] size-3 rounded-full bg-[#dd704b] shadow-[0_0_0_7px_rgba(221,112,75,0.12)]" />
          <div aria-hidden="true" className="absolute bottom-[16%] right-[13%] size-4 rounded-full bg-[#8b9a6b] shadow-[0_0_0_8px_rgba(139,154,107,0.15)]" />

          <div className="absolute right-[4%] top-[7%] z-20 hidden -rotate-6 items-center gap-2 rounded-full border border-[#193b32]/10 bg-[#fffdf7] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#52675d] shadow-lg shadow-[#193b32]/10 dark:border-white/10 dark:bg-[#1b2d26] dark:text-[#d3ded5] sm:flex">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#e4e8d8] text-[#193b32] dark:bg-white/10 dark:text-[#dceeb1]">
              <HandHeart aria-hidden="true" className="size-3.5" />
            </span>
            Neighbors helping neighbors
          </div>

          <div className="relative z-10 w-[84%] max-w-[420px] rotate-[-3deg] rounded-[28px] border border-[#193b32]/10 bg-[#fffdf7] p-4 shadow-[0_35px_90px_-38px_rgba(25,59,50,0.32)] transition-transform duration-500 hover:rotate-0 dark:border-white/10 dark:bg-[#1b2d26] dark:shadow-black/30 sm:rounded-[34px] sm:p-6">
            <div className="flex items-center justify-between border-b border-[#193b32]/10 px-1 pb-4 dark:border-white/10">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8a735d] dark:text-[#d7b998]">The neighborhood edit</p>
                <p className="mt-1 text-sm font-semibold tracking-[-0.03em]">Good turns, close to home</p>
              </div>
              <div className="flex size-9 items-center justify-center rounded-full bg-[#193b32] text-[#f0a36e]">
                <HandHeart aria-hidden="true" className="size-[18px]" />
              </div>
            </div>

            <div className="space-y-3 pt-4">
              {sampleEvents.map((event, index) => {
                const EventIcon = event.icon;

                return (
                  <article
                    key={event.title}
                    className={`relative overflow-hidden rounded-[20px] ${event.tone} p-4 text-[#193b32] dark:bg-[#263b31] dark:text-[#f8f8ef] sm:rounded-[24px] sm:p-5`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#52675d] dark:text-[#c0cdc2]">
                          {event.category}
                        </p>
                        <h2 className="mt-2 max-w-[220px] text-lg font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[21px]">
                          {event.title}
                        </h2>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-[#52675d] dark:text-[#c0cdc2]">
                          <MapPin aria-hidden="true" className="size-3 text-[#dd704b]" />
                          {event.location}
                        </p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fffdf7]/75 text-[#193b32] dark:bg-[#14241f]/75 dark:text-[#dceeb1]">
                        <EventIcon aria-hidden="true" className="size-[18px]" />
                      </span>
                    </div>
                    <span className="absolute -bottom-8 -right-5 text-7xl font-semibold leading-none tracking-[-0.1em] text-[#193b32]/[0.06] dark:text-white/[0.06]">
                      0{index + 1}
                    </span>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between px-1 text-[10px] font-medium text-[#667168] dark:text-[#c0cdc2]">
              <span>One neighborhood at a time.</span>
              <span className="inline-flex items-center gap-1.5 text-[#193b32] dark:text-[#dceeb1]">
                Be part of it <ArrowDown aria-hidden="true" className="size-3 -rotate-45" />
              </span>
            </div>
          </div>

          <div className="absolute bottom-[7%] left-[2%] z-20 hidden -rotate-6 items-center gap-2 rounded-full border border-[#193b32]/10 bg-[#e4e8d8] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#314c40] shadow-lg shadow-[#193b32]/10 dark:border-white/10 dark:bg-[#263b31] dark:text-[#dceeb1] sm:flex">
            <Sprout aria-hidden="true" className="size-3.5" />
            Small acts add up
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1320px] items-center justify-between border-t border-[#193b32]/15 pt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#778078] dark:border-white/15 dark:text-[#aebdb1] sm:mt-14">
        <span>Community is a verb.</span>
        <span>Goodturn · Dhaka</span>
      </div>
    </section>
  );
}
