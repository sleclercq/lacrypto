import './App.css';
import StreamingTicker from "./components/StreamingTicker";


function App() {
    return (
        <div className="App">
            <StreamingTicker symbol='BTCUSDT' />
        </div>
    );
}

export default App;
