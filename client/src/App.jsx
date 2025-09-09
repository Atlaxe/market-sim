import { useEffect, useState } from 'react'
import './App.css'
import CandleChart from './components/CandleChart'


const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

function App(props) {
  const [data, setData] = useState(initialData)

  const addData = () => {
    const lastValue = data[data.length - 1]
    
    // new date
    const newDate = new Date(lastValue.time)
    newDate.setDate(newDate.getDate() + 1);
    const newDateStr = newDate.toISOString().split("T")[0];

    console.log(newDateStr)

    // new price
    const change = (Math.random() * 0.10) - 0.05;
    const newPrice = lastValue.value * (1 + change);

    // new object
    const newData = [
      ...data,
      {
        time: newDateStr,
        value: parseFloat(newPrice.toFixed(2))
      }
    ] 
    setData(newData)
  }

  return (
    <>
      <h1>Hello World</h1>
      <CandleChart {...props} data={data}/>
      <button 
        onClick={addData}
      >Click to add value</button>
    </>
  )
}

export default App
