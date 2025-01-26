"use client";
import { useEffect, useState } from 'react'
import './styles.css'
import Nav from './nav';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Viaoda_Libre } from 'next/font/google';

const viaoda = Viaoda_Libre({ 
  subsets: ['latin'], 
  weight: ['400'], 
});

export default function Menu() {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
          // Change state to true if scrolled more than 50 pixels
          setIsScrolled(window.scrollY > 50);
      };

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup event listener
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <div className={`w-screen fixed top-0 flex justify-start items-center ${isScrolled ? 'bg-white border-b border-black' : ''} z-10 transition`}>  
        <Link href="/">
          <div className="flex items-center space-x-2 p-4">
            <p className={`text-3xl font-bold ${viaoda.className}`}>AMARA INFINITES</p>
          </div>
        </Link>
      </div>
      <div onClick={() => setIsActive(!isActive)} className="fixed right-0 w-20 h-20 flex items-center justify-center cursor-pointer z-[10000]">
          <div className={`burger ${isActive ? "burgerActive after:bg-white before:bg-white" : ""}`}></div>
      </div>
      <AnimatePresence mode='wait'>
          {isActive && <Nav closeNav={() => setIsActive(false)}/>}
      </AnimatePresence>
    </>
  )
}