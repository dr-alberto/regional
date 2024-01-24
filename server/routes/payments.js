const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);
const { User } = require('../models/user')
const router = express.Router();



router.post("/create-checkout-session", requireAuth, async (req, res) => {
    const priceId = req.body.priceId;
    const userId = req.user.id;
    const user = await User.findById(req.user.id)

    let sessionObj = {
        client_reference_id: userId,
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        tax_id_collection:{
            enabled: true,
        },
        automatic_tax:{
            enabled: true,
        },
        allow_promotion_codes: true,
        
        success_url: `${process.env.CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/billing`,
    } 

    if (user.customerId) {
        sessionObj['customer'] = user.customerId
        sessionObj['customer_update'] = {name: 'auto'}
    }
    
    
    const session = await stripe.checkout.sessions.create(sessionObj);
    
    res.json({ url: session.url })
});


router.post("/customer-portal", requireAuth, async (req, res) => {
    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = `${process.env.CLIENT_DOMAIN}/billing`;
    const user = await User.findById(req.user.id)
    const customerId = user.customerId
    
    if (customerId) {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });

        // Redirect to the URL for the session
        res.json({ url: portalSession.url })
    }

});


router.get('/config', requireAuth, (req, res) => {
    res.json({
        priceStarter: process.env.STRIPE_PRICE_STARTUP,
        priceExpansion: process.env.STRIPE_PRICE_EXPANSION,
        priceGrowth: process.env.STRIPE_PRICE_GROWTH
    })
})

router.get('/subInfo', requireAuth, async (req, res) => {
    const user = await User.findById(req.user.id);
    const subscriptionId = user.subscriptionId
    let plan;

    if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        plan = subscription.items.data[0].price.id;
    }
    
    res.json({
        plan
    })
})


router.post("/webhook", async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_SECRET

    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];
    
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }
    
    

    switch (eventType) {
        case 'checkout.session.completed': {

            const clientReferenceId = data.object.client_reference_id
            const customerId = data.object.customer
            const subscriptionId = data.object.subscription

            const user = await User.findById(clientReferenceId)
            user.customerId = customerId
            user.subscriptionId = subscriptionId
            
            const newUser = await user.save()

        } break;

        case 'customer.subscription.deleted': {

            const subscription = data.object
            const customerId = subscription.customer

            const newUser = await User.findOneAndUpdate(
                { customerId: customerId }, 
                { $unset: { subscriptionId: "" } }
            )

        } break;
            
        case 'customer.subscription.updated': {
            const subscription = data.object
            const customerId = subscription.customer
            const subscriptionId = subscription.id

            const newUser = await User.findOneAndUpdate(
                { customerId: customerId }, 
                { subscriptionId: subscriptionId }
            )
                
        } break;

        default:
            // Unhandled event type
    }
  
    res.sendStatus(200);
});
  

module.exports = router;