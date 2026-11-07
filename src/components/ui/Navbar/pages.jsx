"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Discover", href: "/#discover" },
  { label: "Experiences", href: "/#experiences" },
  { label: "For hosts", href: "/#hosts" },
  { label: "Our story", href: "/#story" },
];

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className="size-10 shrink-0"
    >
      <rect x="1" y="1" width="38" height="38" rx="13" fill="#D8FF75" />
      <path
        d="M20 8.5c1.2 6.3 3.2 8.3 9.5 9.5-6.3 1.2-8.3 3.2-9.5 9.5-1.2-6.3-3.2-8.3-9.5-9.5 6.3-1.2 8.3-3.2 9.5-9.5Z"
        fill="#171820"
      />
      <circle cx="30" cy="29.5" r="2.5" fill="#171820" />
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex min-h-[76px] max-w-[1320px] items-center justify-between rounded-[22px] border border-white/10 bg-[#171820]/95 px-4 text-white shadow-[0_18px_60px_-28px_rgba(23,24,32,0.8)] backdrop-blur-xl sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8FF75]"
          aria-label="Meetcute home"
          onClick={closeMenu}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="text-[1.35rem] font-semibold tracking-[-0.07em] sm:text-[1.55rem]">
              meetcute<span className="text-[#D8FF75]">.</span>
            </span>
            <span className="mt-1.5 hidden text-[9px] font-medium uppercase tracking-[0.22em] text-white/45 sm:block">
              find your kind of people
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-3 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8FF75] ${
                index === 0
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/#signin"
            className="text-[13px] font-medium text-white/65 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/#hosts"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#D8FF75] px-5 text-[13px] font-semibold text-[#171820] transition-colors hover:bg-[#e3ff9b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8FF75]"
          >
            Host an event <ArrowUpRight aria-hidden="true" className="ml-1 size-4" />
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full text-white hover:bg-white/10 hover:text-white focus-visible:ring-[#D8FF75] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </Button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[calc(100%+10px)] rounded-[22px] border border-white/10 bg-[#171820] p-3 shadow-2xl lg:hidden"
          >
            <div className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8FF75]/75">
              Make a little plan
            </div>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#D8FF75] ${
                      index === 0
                        ? "bg-white/[0.08] text-white"
                        : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                    <ArrowDownRight aria-hidden="true" className="size-4 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <Link
                href="/#story"
                onClick={closeMenu}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#D8FF75]"
              >
                Sign in
              </Link>
              <Link
                href="/#hosts"
                onClick={closeMenu}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#D8FF75] text-sm font-semibold text-[#171820] transition-colors hover:bg-[#e3ff9b] focus-visible:outline-2 focus-visible:outline-[#D8FF75]"
              >
                Host an event <ArrowUpRight aria-hidden="true" className="ml-1 size-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
