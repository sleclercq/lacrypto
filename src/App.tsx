import './App.css';
import StreamingTicker from "./components/StreamingTicker";
import binanceService, {DebugMessageHook} from "./services/binanceService";

const toggleDebug = () => {
    binanceService.getInstance()?.addMessageHook(DebugMessageHook)
}

const deleteMessageHooks = () => {
    binanceService.getInstance()?.removeMessageHooks()
}

function App() {
    return (
        <div className="App">
            <StreamingTicker symbol='BTCUSDT' />
            <button name="Debug" onClick={toggleDebug}>Debug</button>
            <button name="ClearHooks" onClick={deleteMessageHooks}>Clear Hooks</button>
        </div>
    );
}

export default App;
