import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

interface TickerData {
    symbol: string,
    price: number
}

interface TickerProps {
    symbol: string
}

const Ticker: React.FC<TickerProps> = ({symbol}) => {
    const [tickerData, setTickerData] = useState<TickerData | undefined>(undefined)

    useEffect(() => {
        axios.get<TickerData>(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
            .then(res => setTickerData(res.data))
    }, [symbol])

    return <p>I'm a ticker : {tickerData?.price}</p>
}

function App() {
    return (
        <div className="App">
            <Ticker symbol='BTCUSDT' />
        </div>
    );
}

export default App;
