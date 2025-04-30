'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function MarketingRoadmap() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Top Heading */}
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Marketing That Pays: No Budget Burn, Just Real Growth
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Our 5-step roadmap won’t advance until you see ROI—every dollar is invested, never wasted, for proven, sustainable results.
        </p>
      </div>

      {/* Roadmap Steps */}
      <div className="relative mt-16 w-full max-w-5xl flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute h-full w-1 bg-[#99FF33] left-1/2 transform -translate-x-1/2"></div>

        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black border border-[#99FF33] rounded-xl p-6 w-full md:w-[400px] mb-12 md:ml-[calc(50%+20px)] md:mr-8"
        >
          <h2 className="text-[#99FF33] font-bold text-xl mb-2">STEP 1</h2>
          <h3 className="text-2xl font-bold mb-2">SEO</h3>
          <p className="text-gray-400 text-sm">
            Enhance organic visibility to attract long-term, cost-effective traffic.
            <br />
            <span className="text-white">Average return: $6,000 per $1,000 spent.</span>
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black border border-[#99FF33] rounded-xl p-6 w-full md:w-[400px] mb-12 md:ml-[-50%]"
        >
          <h2 className="text-[#99FF33] font-bold text-xl mb-2">STEP 2</h2>
          <h3 className="text-2xl font-bold mb-2">WEB DESIGN</h3>
          <p className="text-gray-400 text-sm">
            Build a conversion-optimized site that boosts engagement and trust.
            <br />
            <span className="text-white">Average return: $2,000 per $1,000 spent.</span>
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black border border-[#99FF33] rounded-xl p-6 w-full md:w-[400px] mb-12 md:ml-[calc(50%+20px)] md:mr-8"
        >
          <h2 className="text-[#99FF33] font-bold text-xl mb-2">STEP 3</h2>
          <h3 className="text-2xl font-bold mb-2">EMAIL MARKETING</h3>
          <p className="text-gray-400 text-sm">
            Nurture leads with targeted campaigns and automated flows.
            <br />
            <span className="text-white">Average return: $42,000 per $1,000 spent.</span>
          </p>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black border border-[#99FF33] rounded-xl p-6 w-full md:w-[400px] mb-12 md:ml-[-50%]"
        >
          <h2 className="text-[#99FF33] font-bold text-xl mb-2">STEP 4</h2>
          <h3 className="text-2xl font-bold mb-2">GOOGLE ADS</h3>
          <p className="text-gray-400 text-sm">
            Drive immediate, high-intent traffic through search advertising.
            <br />
            <span className="text-white">Average return: $2,000 per $1,000 spent.</span>
          </p>
        </motion.div>

        {/* Step 5 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black border border-[#99FF33] rounded-xl p-6 w-full md:w-[400px] mb-12 md:ml-[calc(50%+20px)] md:mr-8"
        >
          <h2 className="text-[#99FF33] font-bold text-xl mb-2">STEP 5</h2>
          <h3 className="text-2xl font-bold mb-2">META ADS</h3>
          <p className="text-gray-400 text-sm">
            Boost brand awareness and engagement on Facebook & Instagram.
            <br />
            <span className="text-white">Average return: $4,000 per $1,000 spent.</span>
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 max-w-2xl">
        <p className="text-lg md:text-xl mb-4">
          Book your 30 mint free tailored strategy session today
        </p>
        <p className="italic text-gray-400 mb-8">
          no sales-call BS, just a focused strategy session.
        </p>
        <Button className="bg-[#99FF33] text-black font-bold text-lg px-8 py-6 rounded-full hover:bg-[#b3ff66]">
          LET’S DO IT
        </Button>
      </div>
    </div>
  );
}
