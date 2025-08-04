"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';

const HowItWorks = () => {
    const steps = [
        {
            title: "Connect Your Wallet",
            description: "Securely connect your wallet using MetaMask, WalletConnect, or Coinbase Wallet. SwirlX never stores your private keys or user data.",
            spotlightColor: "rgba(255, 255, 255, 0.15)"
        },
        {
            title: "Select Source & Destination Chains",
            description: "Pick the blockchain you're sending from and the one you're sending to. SwirlX supports tokens and NFTs across multiple chains.",
            spotlightColor: "rgba(255, 255, 255, 0.15)"
        },
        {
            title: "Approve and Initiate the Bridge",
            description: "Authorize the transfer and confirm the transaction. SwirlX locks or burns the asset on the source chain and listens for cross-chain proof.",
            spotlightColor: "rgba(255, 255, 255, 0.15)"
        },
        {
            title: "Receive on Target Chain",
            description: "Once verified, your token or NFT is minted or released on the destination chain within seconds — no manual claim needed.",
            spotlightColor: "rgba(255, 255, 255, 0.15)"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            x: -20
        },
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col relative overflow-hidden py-16">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
            
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-16 px-8"
            >
                <motion.h2 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
                >
                    How SwirlX Bridges <br />
                    <span className="text-gray-300">Your Assets</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    <span className="text-white font-semibold">Four Simple Steps</span> to bridge your assets across multiple blockchains
                </motion.p>
            </motion.div>

            <div className="flex-1 flex items-center justify-center px-8">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl w-full"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="h-[320px] md:h-[340px]"
                        >
                            <SpotlightCard 
                                className="h-full hover:scale-105 transition-all duration-300 ease-out p-8 lg:p-10" 
                                spotlightColor={step.spotlightColor}
                            >
                                {/* Step Number */}
                                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-white text-lg font-bold">{index + 1}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight pr-12">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                                    {step.description.split('SwirlX').map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i < step.description.split('SwirlX').length - 1 && (
                                                <span className="text-white font-semibold">SwirlX</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>

                                {/* Progress indicator */}
                                <div className="absolute bottom-8 left-8 right-8 flex space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div 
                                            key={i}
                                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                                i <= index ? 'bg-white' : 'bg-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-16 px-8"
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg"
                    >
                        Start Bridging Now
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-800/20 transition-all duration-300"
                    >
                        View Documentation
                    </motion.button>
                </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
        </div>
    )
}

export default HowItWorks;