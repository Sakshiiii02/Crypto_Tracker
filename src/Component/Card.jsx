import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react";
import { BlurFade } from '@/components/magicui/blur-fade';

const cards = [
  {
    title: "Bitcoin Tracker",
    description: "Monitor Bitcoin prices, trends, and market movements in real-time.",
  },
  {
    title: "Ethereum Tracker",
    description: "Stay updated with Ethereum price changes, trends, and analytics.",
  },
  {
    title: "DodgeCoin Tracker",
    description: "Simplify crypto portfolio management",
  },
  {
    title: "Solana Tracker",
    description: "Effortless Solana portfolio tracking.",
  },
  {
    title: "USDC Tracker",
    description: "A stablecoin pegged to the US dollar for seamless transactions.",
  },
  {
    title: "Hyperliquid Tacker",
    description: " A decentralized exchange for high-speed futures trading",
  },
  
];

const CryptoCards = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <BlurFade delay={0.55} inView>
      <div className="text-center mb-12">
        <p className="text-7xl font-extrabold text-black mb-5">Crypto Portfolio</p>
        <p className="text-xl text-gray-700">
          Track crypto prices, trends, and portfolios in real-time with a reliable crypto tracker.
        </p>
      </div>
      </BlurFade>

      {/* Grid Section */}
      <BlurFade delay={0.67} inView>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative max-w-sm p-6 bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-lg bg-opacity-60"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{card.title}</h5>
            <p className="mb-3 text-gray-700">{card.description}</p>

            {/* Explore Button */}
            <motion.a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              whileHover={{ scale: 1.0 }}
            >
              Explore
              <svg className="w-4 h-4 ml-2" viewBox="0 0 14 10" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </motion.a>

            {/* Dropdown Content */}
            
          </motion.div>
        ))}
      </div>
      </BlurFade>
    </div>
  );
};

export default CryptoCards;
