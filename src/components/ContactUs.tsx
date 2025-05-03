'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await axios.post('/api/messages/save-contact-message', {
        name,
        email,
        message,
      });

      
      alert(response.data.message || "Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      alert(`Error sending message`);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4 py-2 md:py-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 bg-gray-900 p-8 rounded-xl shadow-lg"
      >
        <h1 className='text-white font-extrabold text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-tight'>Contact Us</h1>
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
            className="mt-1 bg-gray-800 resize-none text-white placeholder-gray-400 border border-gray-700 focus:border-[#99FF33] focus:ring-[#99FF33] h-40"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-auto text-center items-center bg-[#99FF33] cursor-pointer text-black font-bold py-3 px-6 rounded-md hover:bg-[#88e62e] transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
