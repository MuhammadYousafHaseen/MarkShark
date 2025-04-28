// components/Navbar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";             // shadcn Button
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "FAQs", href: "/faqs" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNav = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="bg-black text-white fixed w-full z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Let's Chat */}
        <Button
          variant="outline"
          className="text-green-400 border-green-400 cursor-pointer hover:bg-green-400 hover:text-black"
          onClick={() => router.push("/chat")}
        >
          Let&apos;s Chat
        </Button>

        {/* Logo */}
        <div className="text-2xl font-extrabold cursor-pointer text-green-500 select-none">
          MARK SHARK®
        </div>

        {/* Hamburger */}
        <button
          className="p-2 cursor-pointer focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
             <Menu size={24} className="text-green-400" />
        </button>
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
              <X size={28} className="text-green-400 cursor-pointer" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-xl uppercase tracking-wide cursor-pointer hover:text-green-400"
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
              <X size={24} className="text-green-400" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-lg hover:text-green-400 text-left"
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
