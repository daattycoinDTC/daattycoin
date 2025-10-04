"use client";

import { useEffect, useState } from "react";

export default function LivePricesMarquee() {
  const [prices, setPrices] = useState([]);

  async function fetchPrices() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
      );
      const data = await res.json();

      setPrices([
        { symbol: "BTC", price: data.bitcoin.usd },
        { symbol: "ETH", price: data.ethereum.usd },
        { symbol: "USDT", price: data.tether.usd },
      ]);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-dark-blue2 py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-white font-semibold text-sm">
        {prices.map((coin, i) => (
          <span key={i} className="mx-8">
            {coin.symbol}: ${coin.price?.toLocaleString()}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
