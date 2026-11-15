import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Find help close to home",
    description:
      "Discover volunteer opportunities in the neighborhoods you know.",
  },
  {
    icon: CalendarDays,
    title: "Plan a good turn",
    description:
      "Create a clear event and give neighbors an easy way to take part.",
  },
  {
    icon: UsersRound,
    title: "Make it a team effort",
    description:
      "Join local cleanups, planting days, and donation drives together.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    alt: "Volunteers working together on a community project",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80",
    alt: "Neighbors helping prepare supplies for a local drive",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80",
    alt: "Community volunteers gathering outdoors",
  },
];

export function CommunityFeatures() {
  return (
    <section className="bg-white px-5 py-16 text-[#193b32] dark:bg-[#1b2d26] dark:text-[#f8f8ef] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
          Goodturn makes it easier
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          More neighbors. More good turns.
        </h2>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#e4e9df] bg-[#f7f8f1] p-6 dark:border-white/10 dark:bg-[#14241f]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#eaf0e7] text-[#28513f] dark:bg-white/10 dark:text-[#dceeb1]">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#65736a] dark:text-[#c0cdc2]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommunityGalleryAndNewsletter() {
  return (
    <>
      <section className="bg-[#f7f8f1] px-5 py-16 text-[#193b32] dark:bg-[#14241f] dark:text-[#f8f8ef] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735e] dark:text-[#a9c5ad]">
            Neighbors in action
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Small moments, shared impact.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image) => (
              <div
                key={image.src}
                className="relative h-64 overflow-hidden rounded-2xl bg-[#eaf0e7] dark:bg-[#1b2d26]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-[#173c34] p-7 text-[#fffaf0] sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#dceeb1]">
              A little good in your inbox
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Keep up with your community.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Get occasional updates about local events and ways to lend a hand.
            </p>
          </div>
          <div className="flex w-full max-w-md gap-2">
            <input
              type="email"
              aria-label="Email address for newsletter"
              placeholder="Your email address"
              className="h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[#dceeb1]"
            />
            <button
              type="button"
              className="h-12 shrink-0 rounded-full bg-[#dceeb1] px-5 text-sm font-semibold text-[#214b38] transition-colors hover:bg-[#e8f4c8]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
