const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('dotenv');

const storeRouter = require('./router/storeRouter');
const userRouter = require('./router/userRouter');
const cartRouter = require('./router/cartRouter');
const globalErrorHandling = require('./middlewares/errorController');
const CartCheckout = require('./middlewares/checkoutController');
const { protect } = require('./middlewares/authController');

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/store', storeRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/cart', cartRouter);

app.use('/api/v1/checkout', protect, CartCheckout);

// app.post('/api/v1/checkout', async (req, res) => {
//   // const body={
//   //   source:req.body.token.id,
//   //   amount:req.body.amount,
//   //   currency:'usd'
//   // };

//   // stripe.charges.create(body,(stripeErr,stripeRes)=>{

//   //   if(stripeErr){
//   //     //error response
//   //   }else{
//   //     //send response if succesfull purchase happens
//   //   }

//   // })

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map((item) => {
//         console.log('called');
//         console.log(item);
//         return {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: item.name,
//               // images: item?.image,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.CLIENT_URL}`,
//       cancel_url: `${process.env.CLIENT_URL}`,
//     });

//     res.status(200).json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

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
