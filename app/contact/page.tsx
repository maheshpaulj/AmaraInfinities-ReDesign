"use client";
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { FaThreads, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const contactChannels = [
    { 
      icon: Phone, 
      text: '+91 9790813661', 
      href: 'tel:+919790813661' 
    },
    { 
      icon: Mail, 
      text: 'support@amarainfinites.com', 
      href: 'mailto:support@amarainfinites.com' 
    },
    { 
      icon: Instagram, 
      text: 'amara_infinites', 
      href: 'https://www.instagram.com/amara_infinites', 
      external: true 
    },
    { 
      icon: FaXTwitter, 
      text: 'AmaraInfinites', 
      href: 'https://x.com/AmaraInfinites', 
      external: true 
    },
    { 
      icon: FaThreads, 
      text: 'Threads', 
      href: 'https://www.threads.net/@amara_infinites', 
      external: true 
    },
    { 
      icon: Facebook, 
      text: 'Amara Infinites', 
      href: 'https://www.facebook.com/profile.php?id=61566217483352', 
      external: true 
    }
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/amara_infinites' 
    },
    { 
      icon: FaXTwitter, 
      href: 'https://x.com/AmaraInfinites' 
    },
    { 
      icon: FaThreads, 
      href: 'https://www.threads.net/@amara_infinites' 
    },
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/profile.php?id=61566217483352' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen max-w-screen bg-white flex flex-col justify-center items-center"
    >
      <div className="mx-auto px-6 py-12 max-w-2xl">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-center text-gray-800 tracking-tight"
        >
          Contact Us
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          className="space-y-6 mb-12"
        >
          {contactChannels.map(({ icon: Icon, text, href, external }) => (
            <motion.a 
              key={href}
              variants={itemVariants}
              href={href} 
              target={external ? '_blank' : undefined} 
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
            >
              <Icon 
                className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" 
                size={24} 
              />
              <span className="text-lg font-medium">{text}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="social-media text-center"
        >
          <p className="mb-6 text-gray-600">Connect with Us</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map(({ icon: Icon, href }) => (
              <motion.a 
                key={href}
                variants={itemVariants}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={32} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}