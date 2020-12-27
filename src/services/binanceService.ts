import {wsBaseUrl} from "../constants";

interface Message {
    method: string,
    params: Array<string>,
    id: number
}

export const DebugMessageHook = (evt: MessageEvent) => {
    console.log(evt)
}


export default class binanceService {

    static myInstance: binanceService | undefined = undefined

    static getInstance() {
        if (binanceService.myInstance === undefined) {
            binanceService.myInstance = new binanceService()
        }
        return this.myInstance
    }

    private myMessage: Message = {
        method: "SUBSCRIBE",
        params: [
            "btcusdt@miniTicker"
        ],
        id: 1
    }

    private _ws: WebSocket;
    private messageHooks: { (evt: MessageEvent): void; }[] = [];

    constructor() {
        this._ws = new WebSocket(`${wsBaseUrl}`)

        this._ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connnected')
            this._ws.send(JSON.stringify(this.myMessage))
            console.log("sent")
        }

        this._ws.onmessage = (evt: MessageEvent) => {
            // might be simpler down the line to parse evt.data here, but first
            //  we have to be sure to parse evt.data into the correct type
            if ('id' in JSON.parse(evt.data)) {
                console.log(`Service message ${evt.data}`)
                return
            }
            this.messageHooks.forEach(hook => hook(evt))
        }

        this._ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
        }
    }

    addMessageHook(hook: { (evt:MessageEvent): void} ) {
        this.messageHooks.push(hook)
        console.log('message hook added!')
    }

    removeMessageHooks() {
        this.messageHooks = []
        console.log('message hooks removed!')
    }

    test() {
        console.log('test!')
    }

    close() {
        this._ws.close()
        console.log('ws closed!')
    }


}
