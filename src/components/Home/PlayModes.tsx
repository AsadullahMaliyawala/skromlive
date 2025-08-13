"use client";
import Image from "next/image";
import React from "react";

const PlayModes = () => {
  return (
    <section className="py-10 lg:py-12.5 xl:py-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex justify-center">
            <Image
              src="/uploads/singleplayer.png"
              alt="Single Player"
              width={372}
              height={220}
              className="w-auto h-auto max-w-full rounded-[10px]"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/uploads/multiplayer.png"
              alt="Multiplayer"
              width={372}
              height={220}
              className="w-auto h-auto max-w-full rounded-[10px]"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/uploads/onsiteplay.png"
              alt="On-site Play"
              width={372}
              height={220}
              className="w-auto h-auto max-w-full rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayModes;


