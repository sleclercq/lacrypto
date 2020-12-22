import React, {useEffect, useState} from "react";
import {TickerData, TickerProps} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";

const SimpleTicker: React.FC<TickerProps> = ({symbol}) => {
    const [tickerData, setTickerData] = useState<TickerData | undefined>(undefined)

    useEffect(() => {
        axios.get<TickerData>(`${apiBaseUrl}ticker/price?symbol=${symbol}`)
            .then(res => setTickerData(res.data))
    }, [symbol])

    return <p>I'm a ticker : {tickerData?.price}</p>
}

export default SimpleTicker
