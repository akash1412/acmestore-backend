const transformResults = (data) => {
  const results = {
    men: [],
    women: [],
    hat: [],
    jacket: [],
    sneaker: [],
  };

  data.forEach((item) => {
    results[item.category].push(item);
  });

  for (const [key, value] of Object.entries(results)) {
    results[key] = value.slice(0, 4);
  }

  return results;
};

module.exports = {
  transformResults,
};
