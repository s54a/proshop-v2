import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
