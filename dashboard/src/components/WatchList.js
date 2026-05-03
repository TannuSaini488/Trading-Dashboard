import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { watchlist as initialWatchlist } from "../data/data";
import WacthListItem from "./WatchListItem";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [stocks, setStocks] = useState(initialWatchlist);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    const socket = io(apiBaseUrl);

    socket.on("priceUpdate", (updatedStock) => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.name === updatedStock.name
            ? { ...stock, ...updatedStock }
            : stock
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const filteredWatchlist = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const labels = filteredWatchlist.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WacthListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;
