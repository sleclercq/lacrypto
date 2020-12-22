export interface BinanceMiniTicker {
    "e": string,          // Event type
    "E": number,          // Event time
    "s": string,          // Symbol
    "c": number,          // Close price
    "o": number,          // Open price
    "h": number,          // High price
    "l": number,          // Low price
    "v": number           // Total traded base asset volume
    "q": number           // Total traded quote asset volume
}

export interface TickerData {
    symbol: string,
    price: number
}

export interface TickerProps {
    symbol: string
}
