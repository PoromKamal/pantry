'use client'

import Image from "next/image";

import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <h1>Landing</h1>
    </main>
  );
}
