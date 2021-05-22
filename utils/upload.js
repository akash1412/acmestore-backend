const fs = require('fs');
const mongoose = require('mongoose');
const Item = require('../model/item');

const data = JSON.parse(fs.readFileSync('updated.json', 'utf-8'));

const uploadData = async () => {
  try {
    await Item.create(data);

    console.log('data uploaded');
  } catch (error) {
    console.log(error);
  }
};

const DeleteDBCollections = async () => {
  try {
    await Item.deleteMany();
    console.log('DB Cleaned');
  } catch (error) {
    console.log(error);
  }
};

mongoose
  .connect(
    'mongodb+srv://john:<PASSWORD>@cluster0.r2qwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'.replace(
      '<PASSWORD>',
      'pMd77k42luEF0eN4'
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    uploadData();
  })
  .catch((err) => console.log(err));
