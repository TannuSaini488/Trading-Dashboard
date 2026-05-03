import React from "react";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 mb-4">Open a Zerodha account</h1>
        <p className="mb-4">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <a href={`${process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000"}/register`} style={{ textDecoration: "none" }}>
          <button className="p-2 btn btn-primary fs-5 signup-btn">
            Sign up now
          </button>
        </a>
      </div>
    </div>
  );
}

export default OpenAccount;
