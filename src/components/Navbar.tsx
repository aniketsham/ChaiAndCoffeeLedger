"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-xl text-blue-600">
            ☕ Office Drinks
          </Link>
          <div className="hidden sm:flex gap-4 ml-6">
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/entries" className="hover:underline">
              Entries
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-2 rounded hover:bg-gray-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-2">
          <Link
            href="/"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/entries"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Entries
          </Link>
        </div>
      )}
    </nav>
  );
}
