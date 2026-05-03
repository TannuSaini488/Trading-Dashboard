require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const holdingsRoute = require("./routes/holdingsRoute");
const positionsRoute = require("./routes/positionsRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  'https://zerodha-clone-dashboard-cvhc.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3005'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());

app.use("/holdings", holdingsRoute);
app.use("/positions", positionsRoute);
app.use("/user", userRoute);
app.use("/orders", orderRoute);

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// Mock Price Updates
const stocks = ["INFY", "ONGC", "TCS", "RELIANCE", "WIPRO", "HDFC"];
setInterval(() => {
  const stockUpdate = {
    name: stocks[Math.floor(Math.random() * stocks.length)],
    price: (Math.random() * 2000 + 100).toFixed(2),
    percent: (Math.random() * 2 - 1).toFixed(2),
    isDown: Math.random() > 0.5
  };
  io.emit("priceUpdate", stockUpdate);
}, 2000);

io.on("connection", (socket) => {
  console.log("Client connected to WebSocket");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, async () => {
  console.log(`App Is listening On ${port}`);
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(url);
    console.log("✅ Connected To DB");
  } catch (err) {
    console.error("❌ DATABASE CONNECTION ERROR!");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
    console.error("Full Error:", JSON.stringify(err, null, 2));
    console.error("--------------------------------------------------");
  }
});
