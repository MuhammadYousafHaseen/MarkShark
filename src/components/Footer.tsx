"use client";

import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-white pt-12 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid: Brand, Navigation, Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="w-52 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-10 md:h-16 mb-2">
              <Image
                src="/images/logo.png"
                alt="MarkShark Logo"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <p className="text-gray-300 text-sm leading-tight">
              We create content that is impossible to ignore.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-[#99FF33] text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home','Services','Portfolio','Blog','Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                    <div className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-[#99FF33] text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: 'https://twitter.com' },
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Linkedin, href: 'https://linkedin.com' }
              ].map(({ Icon, href }) => (
                <Link key={href} href={href} passHref>
                  <div className="p-2 bg-[#2A2A2A] rounded-full hover:bg-[#333] transition-colors duration-200">
                    <Icon className="w-5 h-5 text-[#99FF33] hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          © {currentYear} Mark Shark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
