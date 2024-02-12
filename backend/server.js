import express from "express";
import products from "./data/products.js";
const port = 5000;

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
