import EventEmitter from 'events';
import { MessagePortSocket } from './message_port_socket.js';
/**
 * SharedWorkerListener is an extension of the EventEmitter class that implements the Listener interface.
 * It provides functionality to handle incoming messages from a shared worker and emit events for new sockets
 * created in response to these incoming connections. This class is meant to be used in the context of managing
 * MessagePort connections within the SharedWorkerGlobalScope.
 */
export class SharedWorkerListener extends EventEmitter {
    constructor(worker) {
        super();
        this.worker = worker;
        this.handleMessageEvent = (event) => {
            const [port] = event.ports;
            if (!port) {
                return;
            }
            this.emit('new_socket', new MessagePortSocket(port));
        };
    }
    /**
     * Initializes the shared worker listener by assigning the 'handleMessageEvent' method as the event handler
     * for the 'onconnect' event of the SharedWorkerGlobalScope. The 'handleMessageEvent' function will be called
     * whenever a new connection is established with the shared worker.
     */
    open() {
        this.worker.onconnect = this.handleMessageEvent;
    }
    /**
     * Closes the SharedWorkerListener by detaching the 'onconnect' event handler.
     * This stops the listener from emitting new sockets on incoming connections.
     */
    close() {
        this.worker.onconnect = () => { };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl9saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc3BvcnQvYnJvd3Nlci9zaGFyZWRfd29ya2VyX2xpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztBQUdsQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWM3RDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxZQUFZO0lBQ3BELFlBQW9CLE1BQStCO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFxQjNDLHVCQUFrQixHQUFHLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVixPQUFPO1lBQ1QsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUF6QkYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FTRiJ9