import Link from "next/link";
import { ArrowUpRight, Compass, HandHeart, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-[#f7f8f1] px-5 py-14 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 -z-10 size-80 rounded-full bg-[#e6eadc] blur-3xl dark:bg-[#20382d]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 -z-10 size-96 rounded-full bg-[#f0dfc7]/60 blur-3xl dark:bg-[#3b3427]/40"
      />

      <div className="mx-auto grid w-full max-w-[1080px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <section aria-labelledby="not-found-title" className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#193b32]/15 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52675d] dark:border-white/10 dark:bg-white/5 dark:text-[#c7d5c9]">
            <MapPin aria-hidden="true" className="size-3.5 text-[#dd704b]" />
            A little off the map
          </div>

          <p className="mt-6 text-[clamp(5rem,16vw,9rem)] font-semibold leading-[0.82] tracking-[-0.1em] text-[#173c34] dark:text-[#d4e5cf]">
            404<span className="text-[#e89a69]">.</span>
          </p>
          <h1
            id="not-found-title"
            className="mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl"
          >
            Looks like this path took a wrong turn.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#657168] dark:text-[#b2c4b5]">
            We couldn&apos;t find the page you were looking for. Let&apos;s get
            you back to the neighbors and good things happening nearby.
          </p>

          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
            <Link
              href="/"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#193b32] px-5 text-xs font-semibold text-[#fffaf0] transition-colors hover:bg-[#245344] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#dd704b]"
            >
              Back to home
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-[#f0a36e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/events"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#193b32]/20 bg-white/55 px-5 text-xs font-semibold text-[#314c40] transition-colors hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-[#e3eee1] dark:hover:bg-white/10"
            >
              Explore events
            </Link>
          </div>
        </section>

        <div
          aria-hidden="true"
          className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center"
        >
          <div className="absolute inset-[8%] rounded-full border border-dashed border-[#193b32]/20 dark:border-white/15" />
          <div className="absolute inset-[19%] rounded-full border border-[#193b32]/10 dark:border-white/10" />
          <div className="absolute left-[13%] top-[25%] flex size-12 -rotate-12 items-center justify-center rounded-2xl bg-[#f3e4cb] text-[#8a573c] shadow-lg shadow-[#193b32]/10 sm:size-14">
            <Compass className="size-6 sm:size-7" strokeWidth={1.6} />
          </div>
          <div className="absolute bottom-[19%] right-[12%] size-3 rounded-full bg-[#8b9a6b] shadow-[0_0_0_8px_rgba(139,154,107,0.15)]" />
          <div className="relative flex aspect-[0.82] w-[58%] rotate-3 flex-col items-center justify-center rounded-[32px] border border-[#193b32]/10 bg-[#fffdf7] p-5 text-center shadow-[0_35px_80px_-35px_rgba(25,59,50,0.35)] dark:border-white/10 dark:bg-[#1b2d26]">
            <span className="flex size-16 items-center justify-center rounded-[22px] bg-[#e4e8d8] text-[#193b32] dark:bg-[#294336] dark:text-[#d4e5cf]">
              <HandHeart className="size-8" strokeWidth={1.6} />
            </span>
            <span className="mt-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#8a735d] dark:text-[#c0ad92]">
              Neighbors in action
            </span>
            <span className="mt-2 text-xl font-semibold leading-tight tracking-[-0.055em] text-[#193b32] dark:text-[#f8f8ef]">
              Good things are still close to home.
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#f4f0e6] px-3 py-1.5 text-[9px] font-medium text-[#52675d] dark:bg-white/5 dark:text-[#c7d5c9]">
              <MapPin className="size-3 text-[#dd704b]" />
              Find your way back
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
