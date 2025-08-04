"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplineComponent from "./Spline";

const LandingPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Wait for Spline animation to finish (adjust delay as needed)
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <div className="flex h-full">
        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col justify-center items-start px-8 lg:px-16 xl:px-20 max-w-2xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.6, ease: "easeOut" }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Swirl Your Assets <br />
            <span className="text-gray-300">Across Chains.</span> <br />
            <span className="text-gray-400">Fast. Secure. Limitless.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
          >
            SwirlX enables non-custodial bridging of ERC-20 tokens and NFTs across{" "}
            <span className="text-white font-semibold">Ethereum</span>,{" "}
            <span className="text-white font-semibold">Polygon</span>,{" "}
            <span className="text-white font-semibold">Arbitrum</span>, and more.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
              Start Bridging
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-800/20 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Right Side - Spline */}
        <div className="flex-1 relative h-full">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <SplineComponent />
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />
    </div>
  );
};

export default LandingPage;
