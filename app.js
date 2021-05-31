const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('dotenv');

const storeRouter = require('./router/storeRouter');
const userRouter = require('./router/userRouter');
const globalErrorHandling = require('./middlewares/errorController');

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/store', storeRouter);

app.use('/api/v1/users', userRouter);

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
