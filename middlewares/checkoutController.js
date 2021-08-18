const stripe = require('stripe')('sk_test_Mrw2gvyQKQ3y0GBayGPBbzqg00MwP3eQ6R');

const Checkout = async (req, res) => {
  // checkout type
  // if type cart , get user id , return from res

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item?.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/checkout/success?type=${req.body.checkoutType}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/fail`,
    });

    res.status(200).json({
      url: session.url,
      userID: req.user.id || null,
      checkoutType: req.body.checkoutType,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = Checkout;
