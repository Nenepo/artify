"use client";

import React from 'react'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

function SplashScreen() {
    const barsRef = useRef<HTMLDivElement[]>([]);
  const arrowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.to(splashRef.current, {
  opacity: 1,
  duration: 0.5,
  ease: "power2.out",
});


    // Bars animation
    tl.fromTo(
      barsRef.current,
      { x: -100, opacity: 0,  },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.3,
      }
    ).to(
      barsRef.current,
      {
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      },
      "-=0.5"
    );

    // Arrow entrance and exit
    tl.fromTo(
      arrowRef.current,
      { opacity: 0, x: -1000 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    ).to(
      arrowRef.current,
      {
      
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        // onComplete: () => {
        //   void router.push("/login");
        // },
      },
      "+=1"
    );
  }, [router]);
  return (
      <section
      aria-hidden={true}
      ref={splashRef}
      className="bg-blue h-screen w-screen overflow-hidden relative flex justify-center items-center z-[-1] opacity-0 "
    >
      {/* Bars */}
      <div>
        <div
          ref={(el) => {
            if (el) barsRef.current[0] = el;
          }}
          className="w-[191px] h-[1351px] z-20 absolute left-[-50px] top-[-140px] rotate-[30deg] bg-bar  blur-[10px] opacity-80  hidden md:block"
        ></div>
        <div
          ref={(el) => {
            if (el) barsRef.current[1] = el;
          }}
          className="w-[191px] h-[1351px] absolute top-[-140px] left-[300px] rotate-[30deg] bg-bar  blur-[10px] opacity-80 backdrop-blur-3xl hidden md:block"
        ></div>
        <div
          ref={(el) => {
            if (el) barsRef.current[2] = el;
          }}
          className="w-[191px] h-[1351px] absolute top-[-140px] right-[100px] rotate-[30deg] bg-bar  opacity-80 blur-[10px] "
        ></div>
      </div>

      {/* Arrow */}
      <div ref={arrowRef} className="flex items-center z-10">
        {/* Long line */}
        <div className="h-1 w-30 bg-white rounded backdrop-blur-lg" />

        {/* Arrowhead */}
        <div className="w-4 h-4 border-r-4 border-t-4 rotate-45 border-white" />
      </div>
    </section>
  )
}

export default SplashScreen