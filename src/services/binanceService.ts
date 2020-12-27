import {wsBaseUrl} from "../constants";

interface Message {
    method: string,
    params: Array<string>,
    id: number
}

enum ConnectionStatus {
    DISCONNECTED,
    CONNECTED
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

    private _ws: WebSocket;
    private messageHooks: { (evt: MessageEvent): void; }[] = [];
    private subscriptions: string[] = []
    private connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED

    constructor() {
        this._ws = new WebSocket(`${wsBaseUrl}`)

        this._ws.onopen = () => {
            console.log('connnected')
            this.connectionStatus = ConnectionStatus.CONNECTED
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
            this.connectionStatus = ConnectionStatus.DISCONNECTED
        }
    }

    isConnected() {
        return this.connectionStatus === ConnectionStatus.CONNECTED
    }


    addSubscriptionStreams(streams: string[]) {
        const subscriptionParam: string[] = streams.filter(s => !this.subscriptions.includes(s))
        if (subscriptionParam.length === 0) {
            return
        }
        const subscriptionMessage: Message = {
            method: "SUBSCRIBE",
            params: subscriptionParam,
            id: 1
        }
        this._ws.send(JSON.stringify(subscriptionMessage))
        this.subscriptions = this.subscriptions.concat(subscriptionParam)
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
