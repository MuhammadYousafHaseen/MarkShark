'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Mail,
  MapPin,
  Phone,
  UserCircle2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Interfaces
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
  city?: string;
  country?: string;
  state?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user?.isAdmin) {
      alert('No permission. Only admin can access this page.');
      router.push('/register-auth');
      return;
    }

    const fetchData = async () => {
      try {
        const [messagesRes, usersRes] = await Promise.all([
          axios.get('/api/messages/get-messages'),
          axios.get('/api/user/get-users'),
        ]);
        setMessages(messagesRes.data?.data || []);
        setUsers(usersRes.data?.users || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session, status, router]);

  if (!session?.user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-[#99FF33] text-center mb-4"
      >
        Admin Dashboard
      </motion.h1>
      <p className="text-center text-lg mb-8">
        Welcome, {session.user.name}
      </p>

      {/* Messages Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">User Messages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(messages) && messages.map((msg) => (
            <Card key={msg._id} className="bg-[#1E1E1E] border text-white border-white">
              <CardContent className="p-4 space-y-2">
                <p><strong>Name:</strong> {msg.senderName}</p>
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  <a
                    href={`mailto:${msg.senderEmail}`}
                    className="underline text-[#99FF33]"
                  >
                    {msg.senderEmail}
                  </a>
                </p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="text-sm text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-6 bg-white" />

      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Registered Users</h2>
        <div className="grid md:grid-cols-2 gap-6 text-white">
          {Array.isArray(users) && users.map((user) => (
            <Card key={user._id} className="bg-[#1E1E1E] text-white border border-white">
              <CardContent className="p-4 space-y-2">
                <p className="flex items-center gap-2">
                  <UserCircle2 size={16} />
                  <span>{user.name}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  <a
                    href={`mailto:${user.email}`}
                    className="underline text-[#99FF33]"
                  >
                    {user.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{user.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>
                    {user.address}, {user.city || ''}, {user.state || ''}, {user.country || ''}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
