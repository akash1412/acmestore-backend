const transformResults = (data) => {
  const results = {
    men: { type: 'men', items: [] },
    women: { type: 'women', items: [] },
    hat: { type: 'hat', items: [] },
    jacket: { type: 'jacket', items: [] },
    sneaker: { type: 'sneaker', items: [] },
  };

  data.forEach((item) => {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    results[item.category].items.push(item);
  });

  for (const [key, valueObj] of Object.entries(results)) {
    const d = valueObj.items.slice(0, 4);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    results[key] = { ...valueObj, items: d };
  }

  const newResult = [];

  // eslint-disable-next-line no-unused-vars
  Object.entries(results).forEach(([_, prop]) => {
    newResult.push(prop);
  });

  return newResult;
};

module.exports = {
  transformResults,
};
