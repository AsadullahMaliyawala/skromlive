"use client";
import Image from "next/image";
import React from "react";

// Full-width hero banner (replaces the old slider)
const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="w-full">
          <Image
            src="/uploads/herobanner.png"
            alt="Hero banner"
            width={1170}
            height={585}
            priority
            className="w-full h-auto rounded-[10px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;


