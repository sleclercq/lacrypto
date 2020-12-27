import './App.css';
import binanceService, {DebugMessageHook} from "./services/binanceService";
import StreamingTickers from "./components/StreamingTickers";

const toggleDebug = () => {
    binanceService.getInstance()?.addMessageHook(DebugMessageHook)
}

const deleteMessageHooks = () => {
    binanceService.getInstance()?.removeMessageHooks()
}


function App() {
    return (
        <div className="App">
            <button name="Debug" onClick={toggleDebug}>Debug</button>
            <button name="ClearHooks" onClick={deleteMessageHooks}>Clear Hooks</button>
            <StreamingTickers symbols={[]} />
        </div>
    );
}

export default App;
