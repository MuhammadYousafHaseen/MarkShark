"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleNav = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Define the base navigation links
  const baseNavLinks = [
    { title: "Home", href: "/" },
    { title: "FAQs", href: "/faqs" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Services", href: "/services" },
    { title: "Register", href: "/register-auth" },
  ];

  // Conditionally add the Admin Dashboard link
  const navLinks = [...baseNavLinks];
  if (session?.user?.isAdmin) {
    navLinks.push({ title: "Admin Dashboard", href: "/admin/dashboard" });
  }

  return (
    <>
      <header className="bg-black text-white fixed w-full z-50">
        <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Let's Chat Button */}
          <div className="flex-shrink-0">
            <Button
              variant="default"
              className="bg-[#99FF33] text-black hover:bg-[#85e62d] p-0 m-0 px-1 sm:px-2 text-sm md:py-6 md:px-8 sm:text-base md:text-xl font-semibold md:font-bold"
              onClick={() => router.push("/contact")}
            >
              Let&apos;s Chat
            </Button>
          </div>

          {/* Center: Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-48 sm:w-56 md:w-64 lg:w-64 mt-12 sm:mt-12 md:mt-20 mr-6 md:mr-16 m-0 p-0 xl:w-72 h-auto">
              <Image
                src="/images/logo.png"
                alt="MarkShark Logo"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          {/* Right: Hamburger */}
          <div className="flex-shrink-0">
            <button
              className="p-0 sm:p-2 lg:p-4 cursor-pointer focus:outline-none"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={30} className="text-[#99FF33]" />
            </button>
          </div>
        </nav>

      </header>

      {/* Full-Screen Menu Overlay (all screen sizes) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 bg-black text-white bg-opacity-95 flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-5 right-5 p-3 sm:p-4"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={36} className="text-[#99FF33] cursor-pointer" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-wide cursor-pointer hover:text-[#99FF33]"
                onClick={() => handleNav(link.href)}
              >
                {link.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
