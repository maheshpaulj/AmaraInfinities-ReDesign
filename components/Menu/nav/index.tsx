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

export default function Nav({closeNav}:{closeNav:()=>void}) {

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
            <div className="">
                <span className={`text-6xl max-md:text-4xl ${viaoda.className}`}>Amara Infinites® </span>
            </div>
            <div className="flex max-md:flex-col justify-between items-center max-md:space-y-6 w-full text-7xl max-xl:text-4xl gap-3">
              {
                navItems.map( (data, index) => {
                  return (
                    <div className="group flex space-x-2 items-center transition-all" key={index}>
                      <div className={`h-2 w-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all ${pathname === data.href && "opacity-100"}`}></div>
                      <Link href={data.href} onClick={closeNav}>{data.title}</Link>
                    </div>
                )})
              }
            </div>
            <div className="flex w-full justify-between items-center max-w-96 text-lg max-md:text-md max-md:gap-2 gap-10 text-neutral-400 ">
                <a href='https://www.facebook.com/profile.php?id=61566217483352' target='_blank' className='hover:text-neutral-300 transition'>Facebook</a>
                <a href='https://www.instagram.com/amara_infinites' target='_blank' className='hover:text-neutral-300 transition'>Instagram</a>
                <a href='https://x.com/AmaraInfinites' target='_blank' className='hover:text-neutral-300 transition'><FaXTwitter size={24} /></a>
                <a href='https://www.threads.net/@amara_infinites' target='_blank' className='hover:text-neutral-300 transition'>Threads</a>
            </div>
        </div>
    </motion.div>
  )
}