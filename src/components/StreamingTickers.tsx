import React, {useEffect, useState} from "react";
import NewTickerSymbolForm from "./NewTickerSymbolForm";
import StreamingTicker from "./StreamingTicker";
import binanceService from "../services/binanceService";
import {defaultTickers} from "../constants";

interface TickersProps {
    symbols: Array<string>
}


const StreamingTickers: React.FC<TickersProps> = ({ symbols }) => {
    const [tickerSymbols, setTickerSymbols] = useState<Array<string>>([])

    useEffect(() => {
        // initialize binance connection
        binanceService.getInstance()
        setTimeout(() => {
            if (binanceService.getInstance()?.isConnected()) {
                // this is pretty horrible, refactor into binanceService probably
                const subscriptions = defaultTickers.map(t => `${t.toLowerCase()}@miniTicker`)
                binanceService.getInstance()?.addSubscriptionStreams(subscriptions)
                setTickerSymbols(defaultTickers)
            }
        }, 2000)

    }, [])

    const handleDeleteSymbol = (symbol: string) => {
        setTickerSymbols(tickerSymbols.filter(s => s !== symbol))
    }

    return (
        <div className='StreamingTickers'>
            {tickerSymbols.map(tickerSymbol =>
                <div key={tickerSymbol} className='StreamingTickers-ticker'>
                    <StreamingTicker symbol={tickerSymbol} />
                    <div><button onClick={() => handleDeleteSymbol(tickerSymbol)}>Delete</button></div>
                </div>
            )}
            <NewTickerSymbolForm tickerSymbols={tickerSymbols} setTickerSymbols={setTickerSymbols} />
        </div>
    )
}

export default StreamingTickers
