const transformResults = (data) => {
  const results = {
    men: { type: 'men', data: [] },
    women: { type: 'women', data: [] },
    hat: { type: 'hat', data: [] },
    jacket: { type: 'jacket', data: [] },
    sneaker: { type: 'sneaker', data: [] },
  };

  data.forEach((item) => {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    results[item.category].data.push(item);
  });

  for (const [key, valueObj] of Object.entries(results)) {
    const d = valueObj.data.slice(0, 4);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    results[key] = { ...valueObj, data: d };
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
