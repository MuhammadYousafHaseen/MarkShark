'use client';

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
      <section className="relative w-full bg-black flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-7xl h-[80vh] mx-auto bg-black rounded-3xl overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            src="/videos/heroSection.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/40 z-0 rounded-3xl"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 z-10">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
              Grow Your Landscaping Business While We Handle the Marketing.
            </h1>

            <p className="mt-6 text-white text-base sm:text-lg md:text-xl max-w-2xl">
              Our strategy doesn’t just get you clicks — it gets you clients.
              <br className="hidden sm:inline" />
              Curious how we do it?
            </p>

            <Link href="/tell-me-how" passHref>
              <div className="inline-block mt-8 px-8 py-4 bg-[#99FF33] hover:bg-[#7ACC28] text-black font-semibold uppercase rounded-full shadow-lg transition">
                Tell Me How
              </div>
            </Link>

            <div className="flex items-center justify-center mt-4 space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
              ))}
              <span className="ml-2 text-white text-sm">
                4.75 ratings out of 368 reviews
              </span>
            </div>
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
