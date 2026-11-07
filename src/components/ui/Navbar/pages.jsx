"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  HandHeart,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming events", href: "/events" },
  { label: "Our impact", href: "/#mission" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function isActiveLink(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e9df] bg-[#f7f8f1]/95 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-[#14241f]/95 sm:px-5 sm:py-3">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-12 max-w-[1320px] items-center justify-between gap-3 rounded-2xl bg-[#173c34] px-3 text-[#fffaf0] shadow-[0_8px_24px_-16px_rgba(23,60,52,0.7)] sm:min-h-14 sm:rounded-[20px] sm:px-5"
      >
        <Link
          href="/"
          aria-label="Goodturn home"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0a36e]"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#f0a36e] text-[#173c34] transition-transform group-hover:-rotate-6 sm:size-10">
            <HandHeart aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-semibold tracking-[-0.06em] sm:text-[19px]">
              goodturn<span className="text-[#f0a36e]">.</span>
            </span>
            <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.16em] text-[#fffaf0]/55 min-[420px]:block">
              Neighbors in action
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/10 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3.5 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] ${
                  isActive
                    ? "bg-[#f0a36e] text-[#173c34]"
                    : "text-[#fffaf0]/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-pressed={isDark}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-full text-[#fffaf0]/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e]"
          >
            {isDark ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>
          <Link
            href="/login"
            className="hidden h-9 items-center rounded-full border border-white/20 px-4 text-[11px] font-medium text-[#fffaf0] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="/events/create"
            className="hidden h-9 items-center gap-1.5 rounded-full bg-[#dceeb1] px-4 text-[11px] font-semibold text-[#253e31] transition-colors hover:bg-[#e8f4c8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] sm:inline-flex"
          >
            Host an event
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex size-9 items-center justify-center rounded-full text-[#fffaf0] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0a36e] md:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-3 top-[calc(100%-2px)] rounded-2xl border border-[#dfe5da] bg-[#fffdf7] p-3 text-[#193b32] shadow-xl dark:border-white/10 dark:bg-[#1b2d26] dark:text-[#f8f8ef] md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#39765e] ${
                      isActive
                        ? "bg-[#eaf0e7] text-[#174a3a] dark:bg-white/10 dark:text-white"
                        : "text-[#59695f] hover:bg-[#f1f3eb] dark:text-[#d3ded5] dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4 opacity-60" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#e5e9df] pt-3 dark:border-white/10">
              <Link
                href="/login"
                onClick={closeMenu}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#cbd5ca] text-xs font-medium dark:border-white/20"
              >
                Log in
              </Link>
              <Link
                href="/events/create"
                onClick={closeMenu}
                className="inline-flex h-10 items-center justify-center gap-1 rounded-full bg-[#dceeb1] text-xs font-semibold text-[#253e31]"
              >
                Host an event
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
