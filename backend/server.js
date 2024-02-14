import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
