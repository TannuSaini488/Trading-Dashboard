require("dotenv").config();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");

const url = process.env.MONGO_URL;

const holdings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+1.85%" },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
  { name: "RELIANCE", qty: 2, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%", isLoss: true },
  { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "TATAMOTORS", qty: 10, avg: 285.8, price: 306.45, net: "+7.23%", day: "-0.11%", isLoss: true },
  { name: "WIPRO", qty: 4, avg: 489.5, price: 577.75, net: "+18.03%", day: "+3.22%" },
];

const positions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 312.35, price: 312.35, net: "+0.58%", day: "+2.99%", isLoss: false },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3124.75, net: "+10.04%", day: "+0.11%", isLoss: false },
  { product: "MIS", name: "RELIANCE", qty: 5, avg: 2450.00, price: 2465.50, net: "+0.63%", day: "+0.45%", isLoss: false },
  { product: "MIS", name: "TCS", qty: 10, avg: 3200.00, price: 3180.20, net: "-0.62%", day: "-0.15%", isLoss: true },
  { product: "CNC", name: "ADANIPORTS", qty: 15, avg: 750.00, price: 812.30, net: "+8.31%", day: "+1.20%", isLoss: false },
  { product: "MIS", name: "BAJAJ-AUTO", qty: 2, avg: 4200.00, price: 4250.00, net: "+1.19%", day: "+0.85%", isLoss: false },
];

const seedDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB for seeding...");

    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(holdings);
    console.log("Holdings Seeded!");

    await PositionsModel.deleteMany({});
    await PositionsModel.insertMany(positions);
    console.log("Positions Seeded!");

    mongoose.connection.close();
    console.log("Seeding complete. Connection closed.");
  } catch (err) {
    console.error("Seeding Error:", err);
  }
};

seedDB();
