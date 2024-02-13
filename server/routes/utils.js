const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


async function getPriceIdFromSubscription(subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    plan = subscription.items.data[0].price.id;

    return plan
}

module.exports = getPriceIdFromSubscription