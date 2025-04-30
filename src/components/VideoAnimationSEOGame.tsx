'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactFormOnly() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up your submission logic here
    console.log('form submitted');
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 bg-gray-900 p-8 rounded-xl shadow-lg"
      >
        <div>
          <Label htmlFor="name" className="text-white">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="mt-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-[#99FF33] focus:ring-[#99FF33]"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="mt-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-[#99FF33] focus:ring-[#99FF33]"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-white">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your message..."
            required
            className="mt-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-[#99FF33] focus:ring-[#99FF33] h-40"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#99FF33] text-black font-bold py-3 px-6 rounded-md hover:bg-[#88e62e] transition-colors"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
