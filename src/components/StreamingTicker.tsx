import {BinanceMiniTicker, BinanceStreamData, TickerData, TickerProps} from "../types";
import React, { useEffect, useState } from "react";
import binanceService from "../services/binanceService";

function toTickerData(binanceMiniTicker: BinanceMiniTicker): TickerData {
    const tickerData: TickerData = {
        symbol: binanceMiniTicker.s,
        price: binanceMiniTicker.c
    }
    return tickerData;
}

const StreamingTicker: React.FC<TickerProps> = ({ symbol }) => {
    const [tickerClass, setTickerClass] = useState<string>('')
    const [animationCount, setAnimationCount] = useState<number>(0)

    const [previousTickerData, setPreviousTickerData] = useState<TickerData | undefined>(undefined)
    const [tickerData, setTickerData] = useState<TickerData | undefined>(undefined)

    useEffect(() => {
        const ws: binanceService | undefined = binanceService.getInstance()
        if (ws) {
            ws.addSubscriptionStreams([`${symbol.toLowerCase()}@miniTicker`])
            ws.addMessageHook((evt: MessageEvent) => {
                const binanceStreamData: BinanceStreamData = JSON.parse(evt.data)
                const binanceMiniTicker: BinanceMiniTicker = binanceStreamData.data
                if (binanceMiniTicker.s === symbol) {
                    setTickerData(toTickerData(binanceMiniTicker))
                }
            })
        }
        return () => {
            ws?.removeMessageHooks()
        }
    }, [symbol])

    useEffect(() => {
        if (!tickerData) {
            return
        }
        if (!previousTickerData) {
            setPreviousTickerData(tickerData)
            return
        }
        if (Math.trunc(tickerData.price) > Math.trunc(previousTickerData.price)) {
            setTickerClass('up')
            setAnimationCount(value => (value + 1) % 2)
        }
        if (Math.trunc(tickerData.price) < Math.trunc(previousTickerData.price)) {
            setTickerClass('down')
            setAnimationCount(value => (value + 1) % 2)
        }
        setPreviousTickerData(tickerData)
    }, [tickerData, previousTickerData, tickerClass])

    const animationName = tickerClass === '' ? '' : `${tickerClass}-${animationCount}`

    return (
        <div className='StreamingTicker-symbol'>
            <div className='StreamingTicker-symbol-name'>{tickerData?.symbol}</div>
            <div className={`StreamingTicker-symbol-price ${animationName}`}>{tickerData?.price || '0'}</div>
        </div>
    )

}

export default StreamingTicker
