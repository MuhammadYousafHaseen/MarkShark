'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface VideoWithContactFormProps {
  /** Path to your video file, e.g. "/videos/animation.mp4" */
  src: string;
}

export default function VideoWithContactForm({ src }: VideoWithContactFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up your submission logic here
    console.log('form submitted');
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Video Section */}
        <div className="w-full lg:w-1/2 overflow-hidden">
          <video
            className="w-full h-auto object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Dark Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-black text-white p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6"
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
                className="mt-1 bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 h-40"
              />
            </div>

            <Button type="submit" className="align-center items-center bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 cursor-pointer">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
