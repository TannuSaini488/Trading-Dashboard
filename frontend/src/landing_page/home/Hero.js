import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="media/images/homeHero.png" alt="Hero Image" className="mb-5" />
        <h1 className="mt-5">Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
        <a href={`${process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000"}/register`} style={{ textDecoration: "none" }}>
          <button className="p-2 btn btn-primary fs-5 signup-btn">
            Sign up now
          </button>
        </a>
      </div>
    </div>
  );
}

export default Hero;
