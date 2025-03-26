import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Loader from "./Loader";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoGraph = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        );

        const prices = response.data.prices.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        setChartData({
          labels: prices.map((item) => item.time),
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price in USD`,
              data: prices.map((item) => item.price),
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [coinId]);

  return chartData ? <Line data={chartData} /> : <p><Loader/></p>;
};

export default CryptoGraph;
