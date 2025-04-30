'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  number: number;
  suffix?: string;
  isPercentage?: boolean;
  inView: boolean;
}

const stats = [
  { label: "PUBLISHED BLOGS", number: 400 },
  { label: "SUCCESSFUL GOOGLE CAMPAIGNS", number: 500 },
  { label: "Client Retention Rate", number: 98, isPercentage: true },
  { label: "SATISFIED CLIENTS", number: 100 },
  { label: "REVENUE GENERATED", number: 10, suffix: "m" },
  { label: "DELIVERED EMAILS", number: 1, suffix: "m" },
];

export default function ReviewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle inView on both enter and exit
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] text-white px-6 py-16 md:py-24"
    >
      {/* ... your left & image sections unchanged ... */}

      <div className="mt-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          We are just an agency with
        </h3>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  number,
  suffix = "",
  isPercentage = false,
  inView,
}: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Whenever we go out of view, reset to zero
    if (!inView) {
      setCount(0);
      return;
    }

    // inView just became true → start animation
    const duration = 2000;              // total animation time: 2s
    const end = number;
    const increment = duration / end;   // ms per step

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, [inView, number]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1c1c1e] border border-[#99FF33] rounded-2xl py-10 px-6 flex flex-col items-center shadow-lg"
    >
      <h4 className="text-4xl font-extrabold text-[#99FF33]">
        {count}
        {suffix}
        {isPercentage && "%"}+
      </h4>
      <p className="mt-3 text-white text-sm md:text-base font-semibold uppercase text-center">
        {label}
      </p>
    </motion.div>
  );
}
