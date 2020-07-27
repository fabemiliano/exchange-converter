import React, { useState, useEffect, useContext } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { getExchange, getExchangeValue, getExchangeValueWithEuro } from '../services/api';
import { CurrencyContext } from '../context/CurrencyContext';
import '../App.css';
import arrow from '../images/arrow.svg';

function changeFontSize(input, setFontClass) {
  console.log(input.length)
  if (input.length > 9) {
    setFontClass('small-input');
  }
  if (input.length > 14) {
    setFontClass('smaller-input')
  }
}

function sortAlphabetically(array) {
  array.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
}

function Converter() {
  const {
    select1, setSelect1, select2, setSelect2,
  } = useContext(CurrencyContext);

  const [exchange1, setExchange1] = useState([]);
  const [exchange2, setExchange2] = useState([]);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [exchangeResult, setExchangeResult] = useState('');
  const [rate1, setRate1] = useState(1);
  const [rate2, setRate2] = useState(1);
  const [fontClass, setFontClass] = useState('normal-input')
  const [useValue, setUseValue] = useState(true);
  sortAlphabetically(exchange1);
  sortAlphabetically(exchange2);

  useEffect(() => {
    if (useValue && value1 !== '') {
      setExchangeResult(((value1 / rate1) * rate2).toFixed(2));
    }
    if (!useValue && value2 !== '') {
      setExchangeResult(((value2 / rate2) * rate1).toFixed(2));
    }

    if ((value1 === '' && useValue) || (value2 === '' && !useValue)) {
      setExchangeResult('');
    }

    getExchange().then((data) => {
      setExchange1(['EUR', ...Object.keys(data.rates)]);
      setExchange2(['EUR', ...Object.keys(data.rates)]);
    });

    if (select1 !== 'EUR' && select2 !== 'EUR') {
      getExchangeValue(select1, select2)
        .then((data) => {
          setRate1(data.rates[select1]);
          setRate2(data.rates[select2]);
        });
    }

    if (select1 === 'EUR' && select2 === 'EUR') {
      setRate1(1);
      setRate2(1);
    }

    if (select1 === 'EUR' && select2 !== 'EUR') {
      getExchangeValueWithEuro()
        .then((data) => {
          setRate1(1);
          setRate2(data.rates[select2]);
        });
    }

    if (select2 === 'EUR' && select1 !== 'EUR') {
      getExchangeValueWithEuro()
        .then((data) => {
          setRate2(1);
          setRate1(data.rates[select1]);
        });
    }
  }, [select1, select2, rate1, rate2, value1, value2]);
  return (
    <div className="main">
      <div className="currency-left">
        <select
          onChange={(e) => setSelect1(e.target.value)}
          value={select1}
        >
          {exchange1.map((e) => <option>{e}</option>)}
        </select>
        <p>{getSymbolFromCurrency(select1)}</p>
        <input
          maxLength="30"
          className={fontClass}
          placeholder="Amount"
          onChange={(e) => {
            changeFontSize(e.target.value, setFontClass);
            setValue1(e.target.value);
            setUseValue(true);
          }}
          value={useValue ? value1 : exchangeResult}
        />
        <div>{`1 ${select1} = ${(rate2 / rate1).toFixed(5)} ${select2}`}</div>
      </div>
      <div className="currency-right">
        <select
          onChange={(e) => setSelect2(e.target.value)}
          value={select2}
        >
          {exchange2.map((e) => <option>{e}</option>)}
        </select>
        <p>{getSymbolFromCurrency(select2)}</p>
        <input
          className={fontClass}
          maxLength="30"
          placeholder="Amount"
          onChange={(e) => {
            changeFontSize(e.target.value, setFontClass);
            setValue2(e.target.value);
            setUseValue(false);
          }}
          value={useValue ? exchangeResult : value2}
        />
        <div>{`1 ${select2} = ${(rate1 / rate2).toFixed(5)} ${select1}`}</div>
      </div>
      <img src={arrow} width="30px" />
      {/* <button onClick={() => { setValue1(''); setUseValue(true); setExchangeResult(''); setValue2(''); setSelect1('EUR'); setSelect2('EUR'); }} type="button">RESET</button> */}
    </div>
  );
}

export default Converter;
