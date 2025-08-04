"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const SwirlXNavbar = () => {
  const router = useRouter();

  return (
    <nav
      className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50 max-w-5xl w-[95vw] rounded-2xl transition-all duration-300 backdrop-blur-lg  shadow-md border border-white/20"
    >
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="SwirlX Logo"
          width={70}
          height={50}
          className="rounded-full cursor-pointer hover:scale-105 transition-transform"
          onClick={() => router.push("/")}
        />
        </div>
        <div className="flex gap-6 items-center text-sm font-medium">
          <span
            onClick={() => router.push("/weather")}
            className="cursor-pointer text-white hover:scale-105 transition-transform"
          >
            Home
          </span>
          <span
            onClick={() => router.push("/crop-description")}
            className="cursor-pointer text-white hover:scale-105 transition-transform"
          >
            Bridge
          </span>
          <span
            onClick={() => router.push("/government-schemes")}
            className="cursor-pointer text-white hover:scale-105 transition-transform"
          >
            Docs
          </span>
        </div>
        <ConnectButton />
      </div>
    </nav>
  );
};
