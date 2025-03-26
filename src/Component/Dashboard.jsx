import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";
import CryptoGraph from "./DashBoardChart";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { BlurFade } from "@/components/magicui/blur-fade";

const Dashboard = () => {
  const [toggle, settoggle] = useState(false)
  const [marketData, setMarketData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [searchQueryNavbar, setSearchQueryNavbar] = useState("");
  const [searchQueryGainers, setSearchQueryGainers] = useState("");

  const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`;
  const EXCHANGE_API_URL = `https://api.coingecko.com/api/v3/exchanges`;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(API_URL);
        setMarketData(response.data);
        setTrendingCoins((response.data).slice(0,5)); 
        setTopGainers([...response.data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchExchanges = async () => {
      try {
        const response = await axios.get(EXCHANGE_API_URL);
        setExchanges(response.data.slice(0, 40));
      } catch (error) {
        console.error("Error fetching exchange data:", error);
      }
    };

    fetchCryptoData();
    fetchExchanges();

    const interval = setInterval(() => {
      fetchCryptoData();
      fetchExchanges();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavbarSearch = (query) => {
    setSearchQueryNavbar(query);
  };

  const handleGainersSearch = (event) => {
    setSearchQueryGainers(event.target.value);
  };

  const filteredTopGainers = topGainers.filter(coin => 
    coin.name.toLowerCase().includes(searchQueryGainers.toLowerCase())
  );

  const filteredExchanges = exchanges.filter(exchange => 
    exchange.name.toLowerCase().includes(searchQueryGainers.toLowerCase())
  );

  return (
    <>

      <DashboardNavbar />
       <BlurFade delay={0.80} inView>
      <div className="p-6">
        {/* Global Market Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
        <motion.div className="p-4 bg-white shadow-2xl rounded-lg">
  <h2 className="text-xl font-bold mb-4">🌎 Global Market</h2>
  {marketData ? (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className="text-gray-600">💰 Market Cap</p>
        <p className="font-bold">${marketData.reduce((acc, coin) => acc + coin.market_cap, 0).toLocaleString()}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-gray-600">📊 24h Volume</p>
        <p className="font-bold">${marketData.reduce((acc, coin) => acc + coin.total_volume, 0).toLocaleString()}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-gray-600">🔥 24h Market Change</p>
        <p 
          className={`font-bold ${
            marketData.reduce((acc, coin) => acc + coin.price_change_percentage_24h, 0) > 0 
              ? "text-green-500" 
              : "text-red-500"
          }`}
        >
          {marketData.reduce((acc, coin) => acc + coin.price_change_percentage_24h, 0).toFixed(2)}%
        </p>
      </div>
      <div className="flex justify-between">
        <h3 className="text-md font-semibold text-gray-600">⚡ Active Cryptos</h3>
        <p className="text-lg font-bold">{marketData.length}</p>
      </div>
    </div>
  ) : (
    <p><Loader/></p>
  )}
</motion.div>


          {/* Trending Coins */}
          <motion.div className="p-4 bg-white shadow-2xl rounded-lg">
  <h3 className="text-xl font-semibold mb-4">🔥 Trending Coins</h3>
  
  <div className="grid grid-cols-2 gap-4">
    {trendingCoins.map(coin => (
      <div key={coin.id} className="flex items-center space-x-2">
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
        <p>{coin.name}</p>
      </div>
    ))}
  </div>

</motion.div>


          {/* Bitcoin Stats */}
          <motion.div className="p-4 bg-white shadow-2xl rounded-lg">
  <h3 className="text-xl font-semibold mb-4">🔶 Bitcoin Stats</h3>
  
  {marketData ? (
    <>
      {[
        { label: "💰 Price", value: marketData.find(coin => coin.id === "bitcoin")?.current_price },
        { label: "📈 24h High", value: marketData.find(coin => coin.id === "bitcoin")?.high_24h },
        { label: "📉 24h Low", value: marketData.find(coin => coin.id === "bitcoin")?.low_24h },
        { label: "📊 24h Volume", value: marketData.find((coin) => coin.id === "bitcoin")?.total_volume }
      ].map((stat, index) => (
        <div key={index} className="flex justify-between space-y-2">
          <p>{stat.label}</p>
          <p>${stat.value?.toLocaleString()}</p>
        </div>
      ))}
    </>
  ) : (
    <p><Loader/></p>
  )}
</motion.div>

        </div>

        {/* Graphs & Top Gainers */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-center text-3xl font-bold">Graph (Bitcoin , Etherium , Dogecoin)</p>
            <CryptoGraph coinId="bitcoin" />
            <CryptoGraph coinId="ethereum" />
            <CryptoGraph coinId="dogecoin" />
          </div>

          <div className="p-4 bg-white shadow-2xl rounded-lg max-h-[1000px] overflow-y-auto">
            {/* Search Bar for Gainers & Exchanges */}
            <Input
              type="text"
              className="w-full p-2 border rounded-none shadow-md"
              placeholder="Search Coins or Exchanges..."
              value={searchQueryGainers}
              onChange={handleGainersSearch}
            />

            {/* Top Gainers */}
            <h3 className="text-xl font-semibold mt-4">🚀 Top Gainers</h3>
            {filteredTopGainers.map(coin => (
  <div key={coin.id} className="flex items-center  justify-between p-2 rounded-2xl">
    
    <div className="flex items-center">
      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2" />
      <p>{coin.name}</p>
    </div>

    <p className={coin.price_change_percentage_24h > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
      {coin.price_change_percentage_24h.toFixed(2)}%
    </p>

  </div>
))}


            {/* Exchanges */}
            <h3 className="text-xl font-semibold mt-4">🏦 Top Exchanges</h3>
            {filteredExchanges.map(exchange => (
              <div key={exchange.id} className="flex mt-2  items-center justify-between p-2 rounded-2xl">
                <div className="flex items-center">
                <img src={exchange.image} alt={exchange.name} className="w-8 h-8 mr-2" />
                <p>{exchange.name}</p>

                </div>
                <p>Trust Score: {exchange.trust_score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </BlurFade>
    </>
  );
};

export default Dashboard;
