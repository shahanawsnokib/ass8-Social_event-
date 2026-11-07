"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, HandHeart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Upcoming events", href: "/events" },
  { label: "Our mission", href: "/#mission" },
];

function BrandMark() {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-[15px] bg-[#f0a36e] text-[#173c34] shadow-[inset_0_0_0_1px_rgba(23,60,52,0.12)]">
      <HandHeart aria-hidden="true" className="size-[22px]" strokeWidth={1.8} />
    </span>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex min-h-[76px] max-w-[1320px] items-center justify-between rounded-[24px] border border-white/10 bg-[#173c34]/[0.97] px-4 text-[#fffaf0] shadow-[0_18px_55px_-30px_rgba(23,60,52,0.8)] backdrop-blur-xl sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Goodturn home"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="text-[1.4rem] font-semibold tracking-[-0.065em] sm:text-[1.6rem]">
              goodturn<span className="text-[#f0a36e]">.</span>
            </span>
            <span className="mt-1.5 hidden text-[9px] font-medium uppercase tracking-[0.2em] text-[#fffaf0]/55 sm:block">
              neighbors in action
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-3 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] ${
                index === 0
                  ? "bg-white/10 text-[#fffaf0]"
                  : "text-[#fffaf0]/65 hover:bg-white/[0.08] hover:text-[#fffaf0]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="text-[13px] font-medium text-[#fffaf0]/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
          >
            Log in
          </Link>
          <Link
            href="/events/create"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f0a36e] px-5 text-[13px] font-semibold text-[#173c34] transition-colors hover:bg-[#f6b88e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fffaf0]"
          >
            Start a drive <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full text-[#fffaf0] hover:bg-white/10 hover:text-white focus-visible:ring-[#f0a36e] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </Button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[calc(100%+10px)] rounded-[24px] border border-white/10 bg-[#173c34] p-3 shadow-2xl md:hidden"
          >
            <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0a36e]">
              Good things grow nearby
            </p>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-medium text-[#fffaf0]/80 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-2 focus-visible:outline-[#f0a36e]"
                  >
                    {link.label}
                    <ArrowDownRight aria-hidden="true" className="size-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 text-sm font-medium text-[#fffaf0] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#f0a36e]"
              >
                Log in
              </Link>
              <Link
                href="/events/create"
                onClick={closeMenu}
                className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-[#f0a36e] text-sm font-semibold text-[#173c34] transition-colors hover:bg-[#f6b88e] focus-visible:outline-2 focus-visible:outline-[#fffaf0]"
              >
                Start a drive <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
