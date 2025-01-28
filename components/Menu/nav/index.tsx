import React from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim';
import Link from 'next/link';
import { Viaoda_Libre } from 'next/font/google';
import { FaXTwitter } from 'react-icons/fa6';

const viaoda = Viaoda_Libre({ 
  subsets: ['latin'], 
  weight: ['400'], 
});

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Service",
    href: "/service",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

const socialLinks = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61566217483352",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/amara_infinites",
  },
  {
    title: "Twitter",
    href: "https://x.com/AmaraInfinites",
    icon: <FaXTwitter size={24} />,
  },
  {
    title: "Threads",
    href: "https://www.threads.net/@amara_infinites",
  },
]

// Variants for staggered animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export default function Nav({ closeNav }: { closeNav: () => void }) {
  const pathname = usePathname();

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="h-screen w-screen bg-black fixed top-0 left-0 text-white z-[9999] select-none"
    >
      <div className="box-border h-full p-[100px] max-md:p-8 flex flex-col justify-between items-center">
        {/* Brand Name Animation */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <span className={`text-6xl max-md:text-4xl ${viaoda.className}`}>Amara Infinites®</span>
        </motion.div>

        {/* Navigation Links Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex max-md:flex-col justify-between items-center max-md:space-y-6 w-full text-7xl max-xl:text-4xl gap-3"
        >
          {navItems.map((data, index) => (
            <motion.div
              variants={staggerItem}
              key={index}
              className="group flex space-x-2 items-center transition-all"
            >
              <div
                className={`h-2 w-2 rounded-full bg-white scale-0 group-hover:scale-110 transition-all ${
                  pathname === data.href && "scale-110"
                }`}
              ></div>
              <Link href={data.href} onClick={closeNav}>
                {data.title}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex w-full justify-between items-center max-w-96 text-lg max-md:text-md max-md:gap-2 gap-10 text-neutral-400"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              variants={staggerItem}
              key={index}
              href={link.href}
              target="_blank"
              className="hover:text-neutral-300 transition"
            >
              {link.icon ? link.icon : link.title}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}