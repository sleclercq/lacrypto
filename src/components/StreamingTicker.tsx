import {BinanceMiniTicker, TickerData, TickerProps} from "../types";
import React, {useEffect, useState} from "react";
import {wsBaseUrl} from "../constants";

function toTickerData(binanceMiniTicker: BinanceMiniTicker): TickerData {
    const tickerData: TickerData = {
        symbol: binanceMiniTicker.s,
        price: binanceMiniTicker.c
    }
    return tickerData
}


const StreamingTicker: React.FC<TickerProps> = ({ symbol }) => {
    const [tickerData, setTickerData] = useState<TickerData | undefined>(undefined)

    useEffect(() => { // depth
        const ws = new WebSocket(`${wsBaseUrl}btcusdt@miniTicker`)
        //let count = 1

        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connnected')
        }

        ws.onmessage = (evt: MessageEvent) => {
            // listen to data sent from the websocket server
            const binanceMiniTicker: BinanceMiniTicker = JSON.parse(evt.data)
            //console.debug(binanceMiniTicker)
            setTickerData(toTickerData(binanceMiniTicker))
            //count = count + 1
            //console.log(count)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
        }

        return () => {
            ws.close()
            console.log("closed!")
        }

    }, [symbol])

    const truncatedPrice: number = tickerData?.price ? Math.trunc(tickerData.price) : 0

    return (
        <tr>
            <td className='symbolName'>{tickerData?.symbol}</td>
            <td className='symbolPrice'>{truncatedPrice}</td>
        </tr>
    )
}

export default StreamingTicker
