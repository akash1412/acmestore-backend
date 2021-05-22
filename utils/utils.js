const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dhqp2dd6b',
  api_key: 974623625436173,
  api_secret: 'KY_3PkbwRe_CyeLgyGin8C4gCoA',
});

const fs = require('fs');

// fs.writeFile('data.json', JSON.stringify(SHOP_DATA), (err) => {
//   console.log(err);
// });

const storeData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const updatedArray = [];

(() => {
  storeData.map((product) => {
    return cloudinary.v2.uploader
      .upload(product.imageUrl, {
        upload_preset: 'czgq4bpq',
        eager: [
          { width: 400, height: 300, crop: 'pad' },
          { width: 260, height: 200, crop: 'crop', gravity: 'north' },
        ],
      })
      .then(async (res) => {
        product.imageUrl = res.url;

        updatedArray.push(product);
        fs.writeFileSync('updated.json', JSON.stringify([...updatedArray]));
        return product;
      })
      .catch((err) => console.log(err));
  });
})();
