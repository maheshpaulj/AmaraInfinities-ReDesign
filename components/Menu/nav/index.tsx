import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim';
import Link from 'next/link';
import { Viaoda_Libre } from 'next/font/google';

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

export default function index({closeNav}:{closeNav:()=>void}) {

  const pathname = usePathname();

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="h-screen w-screen bg-black fixed top-0 left-0 text-white z-[9999] select-none"
      >
       <div className="box-border h-full p-[100px] flex flex-col justify-between items-center">
            <div className="">
                <span className={`text-6xl ${viaoda.className}`}>Amara Infinities® </span>
            </div>
            <div className="flex justify-between w-full text-7xl gap-3">
                    {
                      navItems.map( (data, index) => {
                        return <div className="group flex space-x-2 items-center transition-all" key={index}>
                                    <div className={`h-2 w-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all ${pathname === data.href && "opacity-100"}`}></div>
                                    <Link href={data.href} onClick={closeNav}>{data.title}</Link>
                                </div>
                      })
                    }
            </div>
            <div className="flex w-full justify-between max-w-96 text-lg gap-10 text-neutral-400">
                <a>Awwwards</a>
                <a>Instagram</a>
                <a>Dribble</a>
                <a>LinkedIn</a>
            </div>
        </div>
    </motion.div>
  )
}