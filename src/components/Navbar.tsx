"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { title: "FAQs", href: "/faqs" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Register", href: "/register-auth" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNav = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="bg-[#000000] text-white fixed w-full z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 h-[80px] flex items-center justify-between relative">
        {/* Left: Let's Chat Button */}
        <div className="flex-shrink-0">
          <Button
            variant="default"
            className="bg-[#99FF33] text-black hover:bg-[#85e62d]"
            onClick={() => router.push("/chat")}
          >
            Let&apos;s Chat
          </Button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-11/12 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none">
          <Image
            src="/images/logo.png"
            alt="MarkShark Logo"
            width={250}
            height={200}
            priority
          />
        </div>

        {/* Right: Hamburger */}
        <div className="flex-shrink-0">
          <button
            className="p-2 cursor-pointer focus:outline-none"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="text-[#99FF33]" />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-5 right-5"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} className="text-[#99FF33] cursor-pointer" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-xl uppercase tracking-wide cursor-pointer hover:text-[#99FF33]"
                onClick={() => handleNav(link.href)}
              >
                {link.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Left-Side Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-y-0 left-0 w-64 bg-black p-8 hidden md:flex flex-col space-y-6"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="self-end mb-4"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} className="text-[#99FF33]" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-lg hover:text-[#99FF33] text-left"
                onClick={() => handleNav(link.href)}
              >
                {link.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
