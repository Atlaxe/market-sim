import { useEffect, useState, useRef } from 'react'
import './App.css'
import CandleChart from './components/CandleChart'

function App(props) {
  const [data, setData] = useState([])

  const ws = useRef(null)
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:2000');

    ws.current.onopen = () => {
      console.log("Connected to websocket")
      ws.current.send("Hello from react!");
    }

    ws.current.onmessage = (event) => {
      // console.log("Messge from the server: ", event.data)
      const msg = JSON.parse(event.data);

      if (msg.type == "priceUpdate") {
        setData(prevData => {
          const newData = [...prevData, { 
            time: msg.time, 
            open: msg.open,
            close: msg.close,
            high: msg.high,
            low: msg.low 
          }];
          return newData;
        });
      }
    }

    ws.current.onclose = () => {
      console.log("Websocket disconnected")
    }

    return () => ws.current.close();
  }, [])

  return (
    <div className='container'>
      <h1>Sarket Mimulator</h1>
      <CandleChart {...props} data={data}/>
    </div>
  )
}

export default App
