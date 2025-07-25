const express = require("express");
const router = express.Router();
const { getCryptoPrice } = require("../services/cryptoService");

router.get("/price", async (req, res) => {
  const symbol = req.query.symbol || "bitcoin";
  const price = await getCryptoPrice(symbol);
  res.json({ price });
});

module.exports = router;
