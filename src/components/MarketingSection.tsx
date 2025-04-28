// components/MarketingSection.tsx
'use client'
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatCardProps {
    label: string;
    number: number;
    suffix?: string;
    isPercentage?: boolean;
  }
const stats = [
  { label: "PUBLISHED BLOGS", number: 400 },
  { label: "SUCCESSFUL GOOGLE CAMPAIGNS", number: 500 },
  { label: "Client Retention Rate", number: 98, isPercentage: true },
  { label: "SATISFIED CLIENTS", number: 100 },
  { label: "REVENUE GENERATED", number: 10, suffix: "m" },
  { label: "DELIVERED EMAILS", number: 1, suffix: "m" },
];

export default function MarketingSection() {
  return (
    <section className="bg-black text-white px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Does your marketing feel like a chore?
          </h2>
          <p className="mt-4 text-gray-300">
            Trust us – we’ve heard it all before…
          </p>
          <ul className="mt-6 space-y-4">
            {[ 
              "Frustrated by a website that doesn't convert?",
              "Underwhelmed with your social presence?",
              "Tired of clients saying \"I didn’t know you did that?\"",
            ].map((point) => (
              <li key={point} className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 w-5 h-5 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden border border-green-400 p-2">
            <Image
              src="/images/kid.webp"
              alt="Kid frustrated"
              width={300}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold">
          We are just an agency with
        </h3>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, number, suffix = "", isPercentage = false }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    if (start === end) return;
    const totalMilSecDur = 2000;
    const incrementTime = (totalMilSecDur / end) < 20 ? 20 : totalMilSecDur / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1c1c1e] border border-green-400 rounded-2xl py-10 px-6 flex flex-col items-center shadow-lg"
    >
      <h4 className="text-4xl font-extrabold text-green-400">
        {count}
        {suffix}
        {isPercentage && "%"}
        +
      </h4>
      <p className="mt-3 text-white text-sm md:text-base font-semibold uppercase text-center">
        {label}
      </p>
    </motion.div>
  );
}
