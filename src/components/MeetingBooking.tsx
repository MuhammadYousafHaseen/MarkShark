"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const timeZones = Intl.supportedValuesOf
  ? Intl.supportedValuesOf('timeZone')
  : ['UTC', 'America/New_York', 'Europe/London', 'Asia/Karachi', 'Asia/Tokyo', 'Australia/Sydney'];

interface FormData {
  date: string;
  tz: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
}

export default function MeetingBooking() {
  const router = useRouter();
  const [systemTz, setSystemTz] = useState('');
  const [form, setForm] = useState<FormData>({
    date: '',
    tz: '',
    slot: '',
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setSystemTz(tz);
    setForm(f => ({ ...f, tz }));
  }, []);

  const slots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM','2:00 PM', '2:30 PM'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/meeting/book-meeting', form);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Booking failed');
      }
      router.push('/thank-you');
    } catch (err ) {
      console.error(err);
      setError('Error booking meeting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20 bg-black flex items-center justify-center p-4"
    >
      <Card className="max-w-lg w-full bg-[#111] p-8 rounded-2xl shadow-2xl">
        <CardContent>
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-white text-center mb-6"
          >
            Book a Meeting
          </motion.h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Picker */}
            <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
              <Label htmlFor="date" className="text-gray-300 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-white" />
                Choose a Date
              </Label>
              <Input
                id="date"
                type="date"
                name="date"
                aria-label="Choose date"
                value={form.date}
                onChange={handleChange}
                required
                className="text-white cursor-pointer focus:ring-[#99FF33] focus:ring-2"
              />
            </motion.div>
            {/* Time Zone */}
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label htmlFor="tz" className="text-gray-300 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-[#99FF33]" />
                Time Zone
              </Label>
              <select
                id="tz"
                name="tz"
                aria-label="Select time zone"
                value={form.tz}
                onChange={handleChange}
                className="w-full p-3 cursor-pointer rounded-lg bg-black text-white focus:ring-[#99FF33] focus:ring-2"
                required
              >
                <option value={systemTz}>{systemTz} (Your System)</option>
                {timeZones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </motion.div>
            {/* Time Slots */}
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label className="text-gray-300 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#99FF33]" />
                Select Time Slot
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {slots.map(slot => {
                  const selected = form.slot === slot;
                  return (
                    <motion.label
                      key={slot}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-3 rounded-lg cursor-pointer ${
                        selected ? 'border-2 border-[#99FF33] bg-gradient-to-r from-green-600 to-green-400 text-black' :
                        'bg-[#1E1E1E] hover:border-2 hover:border-[#99FF33] text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        title="Select time slot"
                        name="slot"
                        value={slot}
                        checked={selected}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium">{slot}</span>
                    </motion.label>
                  );
                })}
              </div>
            </motion.div>
            {/* User Info */}
            {(['name', 'email', 'phone'] as (keyof FormData)[]).map(field => (
              <motion.div key={field} whileFocus={{ scale: 1.02 }} className="space-y-2">
                <Label htmlFor={field} className="text-gray-300 capitalize">
                  {field === 'phone' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  placeholder={field === 'email' ? 'you@example.com' : field === 'phone' ? '123-456-7890' : `Your ${field}`}
                  aria-label={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="focus:ring-green-500 focus:ring-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                  required
                />
              </motion.div>
            ))}
            {/* Reason */}
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label htmlFor="reason" className="text-gray-300">
                Reason for Contact
              </Label>
              <textarea
                id="reason"
                name="reason"
                aria-label="Reason for Contact"
                placeholder="Briefly describe the purpose of the meeting"
                value={form.reason}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg resize-none bg-gradient-to-r from-gray-800 to-gray-900 text-white focus:ring-green-500 focus:ring-2"
                required
              />
            </motion.div>
            {/* Submit */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r cursor-pointer from-[#99FF33] to-green-600 text-black font-bold rounded-lg py-3 hover:from-[#99FF33] hover:to-green-700"
              >
                {loading ? 'Booking...' : 'Book Now'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
}
