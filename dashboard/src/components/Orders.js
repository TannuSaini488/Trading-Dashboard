import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios
      .get(`${apiBaseUrl}/orders/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [token]);

  return (
    <div className="orders-container">
      <h3 className="title">Transaction History ({allOrders.length})</h3>

      <div className="order-table premium-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Price</th>
              <th>Status</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length > 0 ? (
              allOrders.map((stock, index) => (
                <tr key={index}>
                  <td className="instrument-name">{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td>
                    <span className="status-badge complete">Complete</span>
                  </td>
                  <td>
                    <span className={`mode-badge ${stock.mode.toLowerCase()}`}>
                      {stock.mode}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                  <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/" className="btn btn-blue">
                      Get Started
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
