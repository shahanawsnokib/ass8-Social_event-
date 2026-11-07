"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Our impact", href: "/#mission" },
];

export function Navbar() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }

  return (
    <header className="relative z-50 h-10 shrink-0 border-b border-[#e9ede5] bg-white px-4 text-[#193b32] dark:border-white/10 dark:bg-[#172b25] dark:text-[#f8f8ef] sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-[1320px] items-center justify-between"
      >
        <Link
          href="/"
          aria-label="Goodturn home"
          className="text-[15px] font-bold tracking-[-0.04em] text-[#15513e] dark:text-[#d4e5cf]"
        >
          goodturn.
        </Link>

        <div className="hidden items-center gap-5 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[10px] font-medium text-[#354b41] transition-colors hover:text-[#197152] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39765e] dark:text-[#d3ded5] dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-pressed={isDark}
            aria-label="Toggle light and dark theme"
            onClick={toggleTheme}
            className="text-[9px] font-medium text-[#59695f] transition-colors hover:text-[#193b32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39765e] dark:text-[#d3ded5] dark:hover:text-white"
          >
            Light / Dark
          </button>
          <Link
            href="/login"
            className="inline-flex h-[23px] items-center rounded-md bg-[#174a3a] px-3 text-[9px] font-medium text-white transition-colors hover:bg-[#21634d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39765e]"
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
}
