const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('dotenv');
const stripe = require('stripe')('sk_test_Mrw2gvyQKQ3y0GBayGPBbzqg00MwP3eQ6R');

const storeRouter = require('./router/storeRouter');
const userRouter = require('./router/userRouter');
const cartRouter = require('./router/cartRouter');
const globalErrorHandling = require('./middlewares/errorController');

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/store', storeRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/cart', cartRouter);

app.post('/api/v1/checkout', (req, res) => {
  // const body={
  //   source:req.body.token.id,
  //   amount:req.body.amount,
  //   currency:'usd'
  // };

  // stripe.charges.create(body,(stripeErr,stripeRes)=>{

  //   if(stripeErr){
  //     //error response
  //   }else{
  //     //send response if succesfull purchase happens
  //   }

  // })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
              image: storeItem.image,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `https://localhost:3000/checkout/`,
      cancel_url: `https://localhost:3000/`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(globalErrorHandling);

mongoose
  .connect(
    process.env.MONGO_URL.replace('<PASSWORD>', process.env.MONGO_PASSWORD),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to DB');

    app.listen(process.env.PORT || 90, () => {
      console.log('server running on port 90');
    });
  })
  .catch((err) => console.log(err));
