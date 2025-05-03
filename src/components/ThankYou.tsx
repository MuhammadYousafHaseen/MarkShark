"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThankYou() {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-black flex items-center justify-center p-4"
    >
      <Card className="max-w-md w-full bg-[#111] p-8 rounded-2xl shadow-2xl text-center">
        <CardContent>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <CheckCircle2 className="w-16 h-16 text-[#99FF33]" />
            <h1 className="text-2xl font-extrabold text-white">
              Thank You!
            </h1>
            <p className="text-gray-300">
              Your meeting has been successfully scheduled. We look forward to speaking with you on the selected date and time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
          >
            <Button
              className="bg-[#99FF33] cursor-pointer text-black font-bold rounded-lg px-6 py-3 hover:bg-[#85e62d]"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
