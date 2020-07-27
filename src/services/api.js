const getExchange = async () => {
  const call = await fetch('https://api.exchangeratesapi.io/latest');
  const result = call.json();
  return result;
};

const getExchangeValue = async (value1, value2) => {
  const call = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${value1},${value2}`);
  const result = call.json();
  return result;
};

const getExchangeValueWithEuro = async () => {
  const call = await fetch('https://api.exchangeratesapi.io/latest');
  const result = call.json();
  return result;
};

const getExchangeRateData = async (tenDaysAgo, today, value2) => {
  const call = await fetch(`https://api.exchangeratesapi.io/history?start_at=${tenDaysAgo}&end_at=${today}&base=${value2}`);
  const result = call.json();
  return result;
};

export {
  getExchange, getExchangeValue, getExchangeValueWithEuro, getExchangeRateData,
};
