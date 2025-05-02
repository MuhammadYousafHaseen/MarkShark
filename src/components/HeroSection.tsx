"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/image5.png",
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Video Container */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/heroSection.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 sm:py-24 md:py-32 lg:py-40">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-tight">
            Grow Your Landscaping Business While We Handle the Marketing.
          </h1>

          <p className="mt-6 text-white text-lg sm:text-xl md:text-2xl max-w-2xl">
            Our strategy doesn’t just get you clicks — it gets you clients.
            <br className="hidden sm:inline" />
            Curious how we do it?
          </p>

          <Link href="/tell-me-how" passHref>
            <div
              className={`
                inline-block mt-10
                px-8 py-4 sm:px-12 sm:py-5
                md:px-16 md:py-6
                bg-[#99FF33] hover:bg-[#7ACC28]
                text-black font-extrabold  uppercase
                text-2xl sm:text-3xl md:text-2xl
                rounded-full shadow-xl transition
              `}
            >
              Tell Me How
            </div>
          </Link>

          <div className="flex items-center justify-center mt-6 space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
              />
            ))}
            <span className="ml-2 text-white text-base sm:text-lg">
              4.75 ratings out of 368 reviews
            </span>
          </div>
        </div>
      </section>

      {/* ===== PARTNER BAR ===== */}
      <section className="bg-[#1E1E1E] py-3 px-2 sm:px-4 md:px-8 overflow-hidden relative">
        <div className="w-full h-[60px] relative">
          <div className="absolute top-0 left-0 flex w-full h-full animate-marquee">
            {images.map((img, index) => (
              <div key={index} className="flex-1 flex justify-center items-center">
                <Image
                  src={img}
                  alt={`Partner ${index + 1}`}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-full flex w-full h-full animate-marquee">
            {images.map((img, index) => (
              <div key={`dup-${index}`} className="flex-1 flex justify-center items-center">
                <Image
                  src={img}
                  alt={`Partner ${index + 1}`}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CSS Animation ===== */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
