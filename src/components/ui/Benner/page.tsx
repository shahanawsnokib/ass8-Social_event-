import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

const attendeeColors = ["bg-[#f1a987]", "bg-[#9a91f4]", "bg-[#a7c98b]", "bg-[#f2cf74]"];

export default function Banner() {
  return (
    <section
      id="discover"
      aria-labelledby="banner-title"
      className="relative isolate overflow-hidden bg-[#f5f3ec] px-5 pb-20 pt-14 text-[#171820] sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 -z-10 size-[30rem] rounded-full bg-[#d8ff75]/40 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-[-13rem] -z-10 size-[28rem] rounded-full bg-[#d9d5ff]/55 blur-[100px]"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#171820]/10 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#575861] shadow-sm shadow-[#171820]/[0.03]">
            <Sparkles aria-hidden="true" className="size-3.5 text-[#7279e8]" />
            Find your kind of people
          </div>

          <h1
            id="banner-title"
            className="mt-7 max-w-[760px] text-[clamp(3.25rem,7.8vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.085em]"
          >
            Your next favorite
            <span className="relative mt-1 block w-fit">
              story starts here.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1 -z-10 h-[0.16em] w-[96%] -rotate-2 rounded-full bg-[#d8ff75] sm:-bottom-2"
              />
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#686971] sm:text-lg sm:leading-8">
            Meet good people around the things you love. Find a small plan nearby, show up as you are, and let the night surprise you.
          </p>

          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <Link
              href="/#experiences"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#171820] px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7279e8]"
            >
              Find your next thing
              <ArrowRight aria-hidden="true" className="size-4 text-[#d8ff75] transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#hosts"
              className="inline-flex h-14 items-center justify-center rounded-full px-5 text-sm font-semibold text-[#34353c] transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7279e8]"
            >
              I&apos;d like to host
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2" aria-hidden="true">
              {attendeeColors.slice(0, 3).map((color, index) => (
                <span
                  key={color}
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-[#f5f3ec] ${color} text-[9px] font-bold text-[#171820]`}
                >
                  {index === 0 ? "J" : index === 1 ? "M" : "A"}
                </span>
              ))}
            </div>
            <p className="text-xs font-medium text-[#686971]">
              <span className="font-semibold text-[#171820]">Your people are out there.</span> Go find them.
            </p>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute inset-[5%] rounded-full border border-dashed border-[#171820]/15"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[17%] rounded-full border border-[#171820]/[0.08]"
          />
          <div
            aria-hidden="true"
            className="absolute left-[9%] top-[18%] size-3 rounded-full bg-[#7279e8] shadow-[0_0_0_7px_rgba(114,121,232,0.12)]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[15%] right-[16%] size-4 rounded-full bg-[#f1a987] shadow-[0_0_0_8px_rgba(241,169,135,0.18)]"
          />

          <article className="relative z-10 w-[76%] max-w-[390px] rotate-[-3deg] rounded-[30px] border border-white/70 bg-white p-5 shadow-[0_35px_90px_-36px_rgba(23,24,32,0.3)] transition-transform duration-500 hover:rotate-0 sm:rounded-[36px] sm:p-7">
            <div className="relative flex h-48 flex-col justify-between overflow-hidden rounded-[22px] bg-[#dad7ff] p-5 sm:h-56 sm:rounded-[28px] sm:p-6">
              <div aria-hidden="true" className="absolute -right-7 -top-12 size-48 rounded-full border-[18px] border-[#f3b092]" />
              <div aria-hidden="true" className="absolute -bottom-20 -left-9 size-48 rounded-full bg-[#d8ff75]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded-full bg-white/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#34353c]">
                  8 spots left
                </span>
                <Sparkles aria-hidden="true" className="size-5 text-[#171820]" />
              </div>
              <p className="relative z-10 max-w-[210px] text-3xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-4xl">
                Supper club<br />under the stars
              </p>
            </div>

            <div className="px-1 pb-1 pt-5 sm:px-2 sm:pt-6">
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#686971]">
                <CalendarDays aria-hidden="true" className="size-3.5 text-[#7279e8]" />
                Friday, 7:30 PM
                <span aria-hidden="true" className="mx-1 size-1 rounded-full bg-[#c4c3c9]" />
                <MapPin aria-hidden="true" className="size-3.5 text-[#7279e8]" />
                Brooklyn
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#171820]/[0.08] pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {attendeeColors.map((color, index) => (
                      <span
                        key={color}
                        className={`size-7 rounded-full border-2 border-white ${color}`}
                        style={{ zIndex: attendeeColors.length - index }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#686971]">+ 12 going</span>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full bg-[#171820] text-white">
                  <UsersRound aria-hidden="true" className="size-4" />
                </span>
              </div>
            </div>
          </article>

          <div className="absolute bottom-[10%] left-[2%] z-20 hidden -rotate-6 items-center gap-2 rounded-full border border-white/80 bg-[#d8ff75] px-4 py-3 text-xs font-semibold text-[#171820] shadow-lg shadow-[#171820]/10 sm:flex">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Make a little memory
          </div>
          <div className="absolute right-[1%] top-[14%] z-20 hidden rotate-6 rounded-full border border-white/80 bg-white px-4 py-3 text-xs font-semibold text-[#171820] shadow-lg shadow-[#171820]/10 sm:block">
            Good energy only ✳
          </div>
        </div>
      </div>
    </section>
  );
}
