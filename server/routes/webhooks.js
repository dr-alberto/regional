const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { User } = require('../models/user')
const router = express.Router();


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
