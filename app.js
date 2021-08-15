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
const search = require('./middlewares/search');

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/store', storeRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/cart', cartRouter);

app.use('/api/v1/checkout', protect, CartCheckout);

app.use('/api/v1/search', search);

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
