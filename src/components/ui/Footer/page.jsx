import Link from "next/link";
import { ArrowUpRight, HandHeart } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming events", href: "/events" },
  { label: "Create an event", href: "/events/create" },
  { label: "Our impact", href: "/#mission" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#173c34] px-5 pb-5 pt-9 text-[#fffaf0] sm:px-8 sm:pt-11">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-b border-white/15 pb-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="Goodturn home"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-[-0.06em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#f0a36e] text-[#173c34]">
                <HandHeart aria-hidden="true" className="size-4" />
              </span>
              goodturn<span className="text-[#f0a36e]">.</span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-5 text-[#fffaf0]/65">
              Neighbors in action. Find local ways to lend a hand and help your
              community grow stronger, one good turn at a time.
            </p>
          </div>

          <div className="sm:justify-self-end">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f0a36e]">
              Explore
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-xs text-[#fffaf0]/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e]"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-3 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-[10px] text-[#fffaf0]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Goodturn. Made for neighbors, everywhere.</p>
          <a
            href="#"
            className="w-fit transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e]"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
