import { NextResponse } from 'next/server'


// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
 
export async function POST(req, res) {
  const { items } = req.body;

  /*

  const metadata = {
    ...values,
    sku: giftCard.sku,
    brand: giftCard.brand,
    thumbnail: giftCard.meta.image,
    zorroUserId,
  };

  amount,
  currency: 'gbp',
  metadata,
  customer,

  */

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    metadata: {     
      zorroUserId: 'zorroUserId_123'
    },
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  //console.log(paymentIntent);

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  })
}