"use client";
import { motion } from 'framer-motion';
import { Globe, Zap, Star, CheckCircle } from 'lucide-react';
import { Cinzel_Decorative } from 'next/font/google';

const cinzel = Cinzel_Decorative({ 
  subsets: ['latin'], 
  weight: ['400'], 
  display: "swap"
});

export default function About() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    }
  };

  const features = [
    { 
      icon: Globe, 
      title: "Integrated Solutions", 
      description: "Comprehensive business support from sourcing to web development" 
    },
    { 
      icon: Zap, 
      title: "Cutting-Edge Technology", 
      description: "Innovative web solutions and technological approaches" 
    },
    { 
      icon: Star, 
      title: "Partnership Approach", 
      description: "We don't just provide services; we build lasting partnerships" 
    },
    { 
      icon: CheckCircle, 
      title: "End-to-End Management", 
      description: "Streamlined processes across legal, financial, and operational domains" 
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen max-w-screen bg-white flex flex-col justify-center items-center pb-10"
    >
      <div className="container px-6 py-12 max-w-4xl">
        <motion.h1 
          variants={sectionVariants}
          className="text-5xl font-bold mb-8 text-center text-gray-800 tracking-tight"
        >
          <span className={`${cinzel.className}`}>Amara Infinites®</span>
        </motion.h1>

        <motion.p 
          variants={sectionVariants}
          className="text-xl text-center text-gray-600 mb-12"
        >
          You name it; we deliver.
        </motion.p>

        <motion.div 
          variants={sectionVariants}
          className="space-y-6 mb-12 text-gray-700 leading-relaxed"
        >
          <p>
            Join us at Amara Infinites and experience the power of an integrated business solution. Together, we can transform your aspirations into reality, helping you focus on what you do best while we handle the rest.
          </p>
          <p>
            We specialize in transforming the way companies operate by providing an all-in-one business solution that streamlines sourcing, legal compliance, financial management, web development, quality control, and packaging.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div 
              key={title}
              variants={featureVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Icon className="mr-4 text-black" size={36} />
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              </div>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="space-y-6 text-gray-700 leading-relaxed"
        >
          <p>
            At Amara Infinites, we understand that navigating the complexities of modern business can be challenging. That&apos;s why we&apos;ve created a seamless ecosystem designed to empower you at every stage of your journey.
          </p>
          <p>
            With a passion for innovation, we harness cutting-edge technology to provide robust solutions that enhance your online presence and engage your audience. Our commitment to excellence extends to all aspects of your operations.
          </p>
          <p>
            What sets us apart is our holistic approach. We don&apos;t just provide services; we build partnerships. Your goals become our mission as we collaborate to tackle challenges and seize opportunities.
          </p>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="text-center mt-12"
        >
          <p className="text-2xl font-semibold text-gray-800">
            Let&apos;s embark on this journey towards success, one solution at a time.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}