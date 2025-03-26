import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import "chart.js/auto";
import Loader from "./Loader";
import { BlurFade } from "@/components/magicui/blur-fade";

const Graph = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        );
        const data = await response.json();
        const formattedData = data.prices.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));
        setCryptoData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  const chartData = {
    labels: cryptoData.map((item) => item.time),
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: cryptoData.map((item) => item.price),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#4BC0C0",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <>
    <BlurFade delay={0.87} inView>

   
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="p-4 bg-white shadow-lg rounded-lg mx-auto"
    >
      <h2 className="text-6xl font-bold text-center mb-4">Real Time Graph Tracker</h2>
      <h2 className="text-sm font-bold text-center mb-4">
        Bitcoin Price Trend (Last 7 Days)
      </h2>
      {loading ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-center text-gray-600 mx-auto"
        >
          <p><Loader/></p>
        </motion.p>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
          className="mx-auto items-center justify-center flex"
        >
          <Line data={chartData} options={options} />
        </motion.div>
      )}
    </motion.div>
    </BlurFade>
    </>
  );
};

export default Graph;
