"use client";
import gsap from 'gsap';
import './styles.css';
import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Viaoda_Libre } from 'next/font/google';

const viaoda = Viaoda_Libre({ 
  subsets: ['latin'], 
  weight: ['400'], 
});

export default function Home() {
  const clipTopRef = useRef<HTMLDivElement>(null);
  const clipBottomRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeSpanRef = useRef<HTMLDivElement>(null);
  const topMarqueeRef = useRef<HTMLDivElement>(null);
  const bottomMarqueeRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const initializeAnimation = useCallback(() => {
    // Clear any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Reset initial states
    gsap.set([
      clipTopRef.current, 
      clipBottomRef.current, 
      marqueeRef.current, 
      bottomMarqueeRef.current, 
      topMarqueeRef.current, 
      marqueeSpanRef.current,
      textRefs.current,
      buttonRef.current
    ], {
      clearProps: "all"
    });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Top and bottom clip animations
    tl.fromTo([clipTopRef.current, clipBottomRef.current], 
      { height: "50vh" },
      {
        duration: 2,
        height: "33.3vh",
        ease: "power4.inOut",
      }, 1);

    // Marquee positioning
    tl.to([marqueeRef.current, bottomMarqueeRef.current, topMarqueeRef.current], {
      duration: 3.5,
      top: "50%",
      ease: "power4.inOut",
    }, 0.75);

    // Marquee entrance animations
    tl.from([topMarqueeRef.current, bottomMarqueeRef.current], {
      duration: 5,
      left: "100%",
      ease: "power3.inOut",
    }, 1);

    tl.from(marqueeRef.current, {
      duration: 5,
      left: "-50%",
      ease: "power3.inOut",
    }, 1);

    // Clip path animations with full opacity
    tl.to(clipTopRef.current, {
      duration: 2,
      clipPath: "inset(0 0 100% 0)",
      opacity: 1,
      ease: "power4.inOut",
    }, 6);

    tl.to(clipBottomRef.current, {
      duration: 2,
      clipPath: "inset(100% 0 0 0)",
      opacity: 1,
      ease: "power4.inOut",
    }, 6);

    // Marquee and span opacity
    tl.to([marqueeSpanRef.current, bottomMarqueeRef.current, topMarqueeRef.current], {
      duration: 1,
      opacity: 1,
      ease: "power2.inOut",
    }, 6);

    // Text animation
    if (textRefs.current) { 
      const spans = textRefs.current.querySelectorAll('span'); 
      tl.fromTo(spans, 
        { opacity: 0, y: 50 },
        { 
          duration: 0.7, 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          ease: "power3.out",
        }, 7);
    }

    // Button animation
    tl.fromTo(buttonRef.current, 
      { opacity: 0, y: 50 },
      {
        duration: 0.7,
        opacity: 1,
        y: 0,
        ease: "power3.out",
      }, 8);

    // Ensure timeline plays
    tl.play();

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = initializeAnimation();
    return cleanup;
  }, [initializeAnimation, pathname]); 
  
  return (
    <div className="bg-white">
      <div className={`w-screen h-screen select-none ${viaoda.className}`}>
        <div className="loader-clip clip-top" ref={clipTopRef}>
          <div className="marquee" ref={topMarqueeRef}>
            <div className="marquee-container">
              <span>Amara Infinites® </span>
              Amara Infinites® 
              <span>Amara Infinites® </span>
            </div>
          </div>
        </div>
        <div className="loader-clip clip-bottom" ref={clipBottomRef}>
          <div className="marquee" ref={bottomMarqueeRef}>
            <div className="marquee-container">
              <span>Amara Infinites®</span>
              Amara Infinites® 
              <span>Amara Infinites®</span>
            </div>
          </div>
        </div>
        <div className="clip-center flex items-center flex-col-reverse">
          <div className="marquee" ref={marqueeRef}>
            <div className="marquee-container">
              <span ref={marqueeSpanRef}>Amara Infinites® </span>
                Amara Infinites® 
              <span ref={marqueeSpanRef}>Amara Infinites® </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[60%] left-1/2 -ml-[180px] flex flex-col space-y-2 justify-center items-center">
        <div className="text-xl font-semibold text-center" ref={textRefs}>
          <p>
            <span>Business.</span> <span>Legalities.</span> <span>Accounts.</span> <span>Creatives</span>
          </p>
        </div>
        <button
          ref={buttonRef}
          className="cursor-pointer bg-gradient-to-b from-black to-neutral-600 shadow-[0px_4px_32px_0_rgba(3,2,1,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group w-[184px]"
          onClick={() => router.push('/service')}
        >
          <div className="relative overflow-hidden">
            <p
              className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              What do we do?
            </p>
            <p
              className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              We do everything.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}