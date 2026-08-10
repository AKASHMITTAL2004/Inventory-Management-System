const express = require("express");
const { MongoDBconfig } = require('./libs/mongoconfig');
const { Server } = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authrouter = require('./Routers/authRouther');
const productrouter = require('./Routers/ProductRouter');
const orderrouter = require('./Routers/orderRouter');
const categoryrouter = require("./Routers/categoryRouter");
const notificationrouter = require("./Routers/notificationRouters");
const activityrouter = require("./Routers/activityRouter");
const inventoryrouter = require('./Routers/inventoryRouter');
const salesrouter = require('./Routers/salesRouter');
const supplierrouter = require('./Routers/supplierrouter');
const stocktransactionrouter = require('./Routers/stocktransactionrouter');

require("dotenv").config();
const PORT = process.env.PORT || 3003;

const app = express();
const server = http.createServer(app);

// 🟢 FIX 1: Allow all Vercel deployment subdomains & localhost dynamic CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // Cleaned duplicate express.json()

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// 🟢 FIX 2: Added /api/users alias so both /api/auth and /api/users work
app.use('/api/auth', authrouter);
app.use('/api/users', authrouter);

app.use('/api/product', productrouter);
app.use('/api/order', orderrouter);
app.use('/api/category', categoryrouter);
app.use('/api/notification', notificationrouter);
app.use('/api/activitylogs', activityrouter(app)); 
app.use('/api/inventory', inventoryrouter);
app.use('/api/sales', salesrouter);
app.use('/api/supplier', supplierrouter);
app.use("/api/stocktransaction", stocktransactionrouter);

// 🟢 FIX 3: Initialize DB config before server starts listening
MongoDBconfig();

server.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});

module.exports = { io, server };
