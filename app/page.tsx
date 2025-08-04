"use client";

import HowItWorks from "@/components/HowItWorks";
import { SwirlXNavbar } from "@/components/Navbar";
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-black">
      <SwirlXNavbar />
      <LandingPage />
      <HowItWorks />
    </div>
  );
}
