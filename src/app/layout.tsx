"use client";

import "../app/globals.css";
import React from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="pt-4 sm:pt-8">{children}</div>
      </body>
    </html>
  );
}
