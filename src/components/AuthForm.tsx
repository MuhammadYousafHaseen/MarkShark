'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';


export default function AuthForms() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/user/signup', formData);
      alert('Registration successful! Please login');
      setFormData({ name: '', email: '', password: '', phone: '', address: '', city: '' });
    } catch (err) {
      console.error("Error in Registering",err);
      alert(`Error in Registering:`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: true,
        email: loginData.email,
        password: loginData.password,
        callbackUrl: '/',
      });
      if (!res?.error) {
        setLoginData({ email: '', password: '' });
      } else {
        alert('Invalid credentials, please try again.');
      }
    } catch (err) {
      console.error('Error in Logging In:', err);
      alert(`Error in Logging In:`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]  flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.form
          onSubmit={handleRegister}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-white text-2xl font-semibold mb-4">Register</h2>
          {['name', 'email', 'password', 'phone', 'address', 'city'].map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="text-white capitalize">
                {field}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={`Enter your ${field}`}
                required
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="mt-1 bg-white text-black placeholder-gray-600 focus-visible:ring-[#99FF33]"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-[#99FF33] text-black cursor-pointer hover:bg-[#88e62e]"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </motion.form>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-white text-2xl font-semibold mb-4">Login</h2>
          {['email', 'password'].map((field) => (
            <div key={field}>
              <Label htmlFor={`login-${field}`} className="text-white capitalize">
                {field}
              </Label>
              <Input
                id={`login-${field}`}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={`Enter your ${field}`}
                required
                value={loginData[field as keyof typeof loginData]}
                onChange={(e) =>
                  setLoginData({ ...loginData, [field]: e.target.value })
                }
                className="mt-1 bg-white text-black placeholder-gray-600 focus-visible:ring-[#99FF33]"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-[#99FF33] text-black cursor-pointer hover:bg-[#88e62e]"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
