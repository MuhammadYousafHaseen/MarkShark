"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Mail,
  MapPin,
  Phone,
  UserCircle2,
  CalendarCheck,
  Users,
  MessageSquare,
  Trash2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Meeting {
  _id: string;
  date: string;
  tz: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  createdAt: string;
}

interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin:boolean;
  city?: string;
  state?: string;
  country?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.isAdmin) {
      router.push('/register-auth');
      return;
    }
    const fetchAll = async () => {
      try {
        const [meetRes, msgRes, userRes] = await Promise.all([
          axios.get('/api/meeting/get-meetings'),
          axios.get('/api/messages/get-messages'),
          axios.get('/api/user/get-users')
        ]);
        setMeetings(meetRes.data.data);
        setMessages(msgRes.data.data);
        setUsers(userRes.data.users);
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      }
    };
    fetchAll();
  }, [session, status, router]);

  if (!session?.user?.isAdmin) return null;

  const handleDelete = async (type: 'message' | 'meeting' | 'user', id: string) => {
    try {
      const endpointMap = {
        message: '/api/admin/delete-message',
        meeting: '/api/admin/delete-meeting',
        user: '/api/admin/delete-user'
      };
      const payloadKey = {
        message: 'messageId',
        meeting: 'meetingId',
        user: 'userId'
      };
      await axios.post(endpointMap[type], { [payloadKey[type]]: id });
      if (type === 'message') setMessages(prev => prev.filter(m => m._id !== id));
      if (type === 'meeting') setMeetings(prev => prev.filter(m => m._id !== id));
      if (type === 'user') setUsers(prev => prev.filter(u => u._id !== id));
    } catch (error) {
      console.error(`Failed to delete ${type}`, error);
      alert(`Failed to delete ${type}`);
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 space-y-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-gradient from-[#99FF33] via-[#00FFAA] to-[#00FF66] bg-clip-text text-transparent"
      >
        Welcome, {session.user.name}
      </motion.h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Meetings */}
      <section>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-3xl font-bold text-white mb-4 gap-2"
        >
          <CalendarCheck className="text-[#99FF33] w-8 h-8" />
          Upcoming Meetings
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map(m => (
            <motion.div key={m._id} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-[#99FF33] rounded-xl shadow-2xl">
                <CardContent className="space-y-2 p-6">
                  <p className="flex items-center gap-2 text-lg text-white">
                    <Users className="text-[#99FF33] w-5 h-5" /> {m.name}
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${m.email}`} className="underline text-[#99FF33] cursor-pointer">
                      {m.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${m.phone}`} className="underline text-[#99FF33] cursor-pointer">
                      {m.phone}
                    </a>
                  </p>
                  <div className="text-sm text-gray-400">
                    <p><span className="font-semibold">Date:</span> {new Date(m.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {m.slot}</p>
                    <p><span className="font-semibold">TZ:</span> {m.tz}</p>
                    <p><span className="font-semibold">Reason:</span> {m.reason}</p>
                  </div>
                  <Button
                    className="mt-3 cursor-pointer text-black font-semibold"
                    style={{ backgroundColor: '#99FF33' }}
                    onClick={() => handleDelete('meeting', m._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-white" />

      {/* Messages */}
      <section>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-3xl font-bold text-white mb-4 gap-2"
        >
          <MessageSquare className="text-[#99FF33] w-8 h-8" />
          User Messages
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map(msg => (
            <motion.div key={msg._id} whileHover={{ x: 10 }} transition={{ type: 'tween' }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-[#99FF33] rounded-xl shadow-2xl">
                <CardContent className="space-y-2 p-6">
                  <p className="flex items-center gap-2 text-lg text-white">
                    <UserCircle2 className="text-[#99FF33] w-5 h-5" /> {msg.senderName}
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${msg.senderEmail}`} className="underline text-[#99FF33] cursor-pointer">
                      {msg.senderEmail}
                    </a>
                  </p>
                  <p className="mt-2 text-gray-400">“{msg.message}”</p>
                  <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
                  <Button
                    className="mt-3 cursor-pointer text-black font-semibold"
                    style={{ backgroundColor: '#99FF33' }}
                    onClick={() => handleDelete('message', msg._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-white" />

      {/* Users */}
      <section>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-3xl font-bold text-white mb-4 gap-2"
        >
          <Users className="text-[#99FF33] w-8 h-8" />
          Registered Users
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map(user => (
            <motion.div key={user._id} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-[#99FF33] rounded-xl shadow-2xl">
                <CardContent className="space-y-2 p-6">
                  <p className="flex items-center gap-2 text-lg text-white">
                    <UserCircle2 className="text-[#99FF33] w-5 h-5" /> {user.name}
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${user.email}`} className="underline text-[#99FF33] cursor-pointer">
                      {user.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${user.phone}`} className="underline text-[#99FF33] cursor-pointer">
                      {user.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5" />
                    <span>{user.address}, {user.city}, {user.state}, {user.country}</span>
                  </p>
                  {/* ✅ Show delete button only if user is NOT an admin */}
                  {!user.isAdmin && (
                    <Button
                      className="mt-3 text-black cursor-pointer font-semibold"
                      style={{ backgroundColor: '#99FF33' }}
                      onClick={() => handleDelete('user', user._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
