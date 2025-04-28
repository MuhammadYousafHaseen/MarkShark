// components/HeroSection.tsx
'use client';

import Link from "next/link";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/heroSection.mp4" // <-- Replace this with your video path
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20 md:py-32">
          {/* Headline */}
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Grow Your Landscaping Business While We Handle the Marketing.
          </h1>

          {/* Sub‐heading */}
          <p className="mt-6 text-white text-base sm:text-lg md:text-xl">
            Our strategy doesn’t just get you clicks — it gets you clients.
            <br className="hidden sm:inline" />
            Curious how we do it?
          </p>

          {/* CTA Button */}
          <Link href="/tell-me-how" passHref>
            <div className="inline-block mt-8 px-8 py-4 bg-green-400 hover:bg-green-500 text-black font-semibold uppercase rounded-full shadow-lg transition">
              Tell Me How
            </div>
          </Link>

          {/* Ratings with filled stars */}
          <div className="flex items-center justify-center mt-4 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
              />
            ))}
            <span className="ml-2 text-white text-sm">
              4.75 ratings out of 368 reviews
            </span>
          </div>
        </div>

        {/* Optional: Dark overlay if needed */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </section>

      {/* ===== PARTNER BAR ===== */}
      <section className="bg-black text-white text-center py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-6 px-4">
          {['Forbes', 'WSJ', 'Inc.', 'The Economist'].map((name) => (
            <span
              key={name}
              className="font-bold uppercase text-sm sm:text-base md:text-lg tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
