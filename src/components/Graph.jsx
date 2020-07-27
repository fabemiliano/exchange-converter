import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-google-charts';
import { getExchangeRateData } from '../services/api';
import { CurrencyContext } from '../context/CurrencyContext';

function sortDates(array) {
  array.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });
  return array;
}

function getArrayOfData(data, convert) {
  const orderedDates = sortDates((Object.entries(data)));
  let arrayOfData = [];
  if (orderedDates.length > 0) {
    arrayOfData = orderedDates.map((e) => [`${(e[0]).slice(8, 11)}/${(e[0]).slice(5, 7)}`, e[1][convert]]);
  }
  const graphData = arrayOfData.map((e) => [e[0], e[1]]);
  return graphData;
}

function getDates(date, setPickedDate, setInitialDate, setFinalDate) {
  const i = new Date(date);
  i.setDate(i.getDate() + 1);
  const initialDate = `${i.getFullYear()}-${i.getMonth() + 1}-${i.getDate()}`;
  setInitialDate(initialDate);
  const f = new Date(date);
  f.setDate(f.getDate() - 10);
  const finalDate = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;
  setFinalDate(finalDate);
  setPickedDate(date);
}

function Graph() {
  const { select1, select2 } = useContext(CurrencyContext);
  const [data, setData] = useState([]);
  const currency = select1;
  const convert = select2;

  const finalDate = new Date();
  const today = `${finalDate.getFullYear()}-${finalDate.getMonth() + 1}-${finalDate.getDate()}`;
  const initDate = new Date();
  initDate.setDate(initDate.getDate() - 10);
  const tenDaysAgo = `${initDate.getFullYear()}-${initDate.getMonth() + 1}-${initDate.getDate()}`;
  const [initialDate, setInitialDate] = useState(today);
  const [endDate, setFinalDate] = useState(tenDaysAgo);
  const [pickedDate, setPickedDate] = useState(today);
  const [size, setSize] = useState(window.innerWidth);

  const dataArray = [['Ano', 'Rate'], ...getArrayOfData(data, convert)];

  useEffect(() => {
    getExchangeRateData(endDate, initialDate, currency).then((result) => {
      setData(result.rates);
    });
    window.addEventListener('resize', () => setSize(window.innerWidth));
    // console.log(size)
  }, [currency, pickedDate]);

  return (
    <div className="graph">
      <p>Pick a date</p>
      <input type="date" className="date-picker" onChange={(e) => getDates(e.target.value, setPickedDate, setInitialDate, setFinalDate)} value={pickedDate} />
      <div className="chart">
        <Chart
          height="350px"
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={dataArray}
          options={{
            title: `Currency Rate: ${currency} to ${convert}`,
            hAxis: { title: 'Date', viewWindowMode: 'pretty' },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: '100%', height: '70%', left: '80', right: '80' },
            backgroundColor: '#F7F7F9',
            onmouseover: 'row',
            animation: { startup: true, duration: 500, easing: 'inandout' },
            colors: ['#452B4E', '#E9EDFD'],
            crosshair: { color: '#452B4E' },
            fontName: 'Quicksand',
            legend: { position: 'none' },
            lineWidth: 3,
            fontsize: 30,
            width: size * 0.8,
            // lineWidth: 25
          }}
        />
      </div>
    </div>
  );
}

export default Graph;
