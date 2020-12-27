import React, { useState } from "react";

interface NewTickerSymbolProps {
    tickerSymbols: string[]
    setTickerSymbols: React.Dispatch<React.SetStateAction<string[]>>
}

const NewTickerSymbolForm: React.FC<NewTickerSymbolProps> = ({ tickerSymbols, setTickerSymbols }) => {
    const [tickerSymbol, setTickerSymbol] = useState('')

    const handleTickerSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTickerSymbol(event.target.value)
    }

    const addTickerSymbol = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(`adding ticker symbol ${tickerSymbol}`)
        setTickerSymbols(tickerSymbols.concat(tickerSymbol))
        setTickerSymbol('')
    }

    return (
        <form onSubmit={addTickerSymbol}>
            symbol: <input value={tickerSymbol} onChange={handleTickerSymbol} />
            <button type="submit">add</button>
        </form>
    )
}

export default NewTickerSymbolForm

