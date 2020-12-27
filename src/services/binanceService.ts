import {wsBaseUrl} from "../constants";

interface Message {
    method: string,
    params: Array<string>,
    id: number
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
