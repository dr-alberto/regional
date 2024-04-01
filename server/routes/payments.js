const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { User } = require("../models/user");
const router = express.Router();
const getPriceIdFromSubscription = require("./utils");

router.post("/create-checkout-session", requireAuth, async (req, res) => {
  const priceId = req.body.priceId;
  const userId = req.user.id;
  const user = await User.findById(req.user.id);

  let sessionObj = {
    client_reference_id: userId,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    tax_id_collection: {
      enabled: true,
    },
    automatic_tax: {
      enabled: true,
    },
    allow_promotion_codes: true,
    success_url: `${process.env.CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/billing`,
  };

  if (user.customerId) {
    sessionObj["customer"] = user.customerId;
    sessionObj["customer_update"] = { name: "auto" };
  }

  const session = await stripe.checkout.sessions.create(sessionObj);

  res.json({ url: session.url });
});

router.post("/customer-portal", requireAuth, async (req, res) => {
  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = `${process.env.CLIENT_DOMAIN}/billing`;
  const user = await User.findById(req.user.id);
  const customerId = user.customerId;

  if (customerId) {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    // Redirect to the URL for the session
    res.json({ url: portalSession.url });
  }
});

router.get("/config", requireAuth, (req, res) => {
  res.json({
    yearly: {
      priceStarter: process.env.STRIPE_PRICE_STARTUP_YEARLY,
      priceExpansion: process.env.STRIPE_PRICE_EXPANSION_YEARLY,
      priceGrowth: process.env.STRIPE_PRICE_GROWTH_YEARLY,
    },
    monthly: {
      priceStarter: process.env.STRIPE_PRICE_STARTUP_MONTHLY,
      priceExpansion: process.env.STRIPE_PRICE_EXPANSION_MONTHLY,
      priceGrowth: process.env.STRIPE_PRICE_GROWTH_MONTHLY,
    },
  });
});

router.get("/subInfo", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    plan: user.plan,
  });
});

module.exports = router;
