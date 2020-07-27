import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

function CurrencyProvider({ children }) {
  const [select1, setSelect1] = useState('EUR');
  const [select2, setSelect2] = useState('USD');
  const context = {
    select1,
    select2,
    setSelect1,
    setSelect2,
  };
  return (
    <CurrencyContext.Provider value={context}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;
