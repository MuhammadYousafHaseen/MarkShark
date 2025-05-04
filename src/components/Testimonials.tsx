"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import testimonials from "@/Testimonials/testimonials.json";

export default function TestimonialsCarousel() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  const speed = 20;
  const loop = Infinity;

  const rowVariants = (direction = 1) => ({
    animate: {
      x: direction > 0 ? [0, "-50%"] : ["-50%", 0],
      transition: {
        x: { repeat: loop, repeatType: "loop", ease: "linear", duration: speed }
      }
    }
  });

  return (
    <section className="bg-black py-12">
      <div className="max-w-7xl rounded-xl mx-auto space-y-8 px-4 overflow-hidden">
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-center">
          What Our Clients Say
        </h2>

        {[firstRow, secondRow].map((row, idx) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden">
            <motion.div
              className="flex space-x-6 will-change-transform"
              variants={rowVariants(idx === 0 ? 1 : -1)}
              animate="animate"
            >
              {[...row, ...row].map((t, i) => (
                <Card
                  key={i}
                  className="min-w-[500px] bg-[#1E1E1E] hover:border-[#99FF33] hover:border-2 transition-transform duration-300"
                >
                  <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={`/images/${t.image}`}
                        alt={t.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p className="text-gray-300 text-sm">“{t.text}”</p>
                    <h3 className="text-[#99FF33] font-semibold">{t.name}</h3>
                    <span className="text-[#99FF33] text-xs uppercase">
                      {t.title}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
