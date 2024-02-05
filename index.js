const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.API_KEY);
const app = express();
app.use(express.json());
app.use(cors());

app.post("/pay", async (req, res) => {
  const { stripeToken, infoPurchase } = req.body;

  console.log("voici stripeToken: ", stripeToken);
  console.log("voici infoPurchase: ", infoPurchase);
  try {
    const response = await stripe.charges.create({
      amount: parseInt(infoPurchase.priceTotal) * 100,
      currency: "eur",
      description: infoPurchase.priceTotal,
      source: stripeToken,
    });
    console.log(response.status);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(process.env.PORT || 3100, () => {
  console.log("Server started");
});
