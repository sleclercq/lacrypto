import { BinanceMiniTicker, TickerData, TickerProps } from "../types";
import React, { useEffect, useState } from "react";
import binanceService from "../services/binanceService";

function toTickerData(binanceMiniTicker: BinanceMiniTicker): TickerData {
    const tickerData: TickerData = {
        symbol: binanceMiniTicker.s,
        price: binanceMiniTicker.c
    }
    return tickerData
}


const StreamingTicker: React.FC<TickerProps> = ({ symbol }) => {
    const [tickerClass, setTickerClass] = useState<string>('')
    const [animationCount, setAnimationCount] = useState<number>(0)

    const [previousTickerData, setPreviousTickerData] = useState<TickerData | undefined>(undefined)
    const [tickerData, setTickerData] = useState<TickerData | undefined>(undefined)

    useEffect(() => {
        const ws: binanceService | undefined = binanceService.getInstance()
        if (ws) {
            ws.addMessageHook((evt: MessageEvent) => {
                const binanceMiniTicker: BinanceMiniTicker = JSON.parse(evt.data)
                setTickerData(toTickerData(binanceMiniTicker))
            })
        }
        return () => {
            ws?.removeMessageHooks()
        }
    }, [])

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

    const truncatedPrice: number = tickerData?.price ? Math.trunc(tickerData.price) : 0
    const animationName = tickerClass === '' ? '' : `${tickerClass}-${animationCount}`

    return (
        <table>
            <tr className='StreamingTicker-symbol'>
                <td className='StreamingTicker-symbol-name'>{tickerData?.symbol}</td>
                <td className={`StreamingTicker-symbol-price ${animationName}`}>{truncatedPrice}</td>
            </tr>
        </table>
    )

}

export default StreamingTicker
