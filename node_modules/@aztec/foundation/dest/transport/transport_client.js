import EventEmitter from 'events';
import { format } from 'util';
import { createDebugLogger } from '../log/index.js';
import { isEventMessage } from './dispatch/messages.js';
const log = createDebugLogger('aztec:transport_client');
/**
 * A TransportClient provides a request/response and event api to a corresponding TransportServer.
 * If `broadcast` is called on TransportServer, TransportClients will emit an `event_msg`.
 * The `request` method will block until a response is returned from the TransportServer's dispatch function.
 * Request multiplexing is supported.
 */
export class TransportClient extends EventEmitter {
    constructor(transportConnect) {
        super();
        this.transportConnect = transportConnect;
        this.msgId = 0;
        this.pendingRequests = [];
    }
    /**
     * Initializes and opens the socket connection for the TransportClient.
     * This method creates a new Socket instance using the provided Connector,
     * registers a handler for incoming messages, and establishes the connection.
     * It should be called before making any requests or handling events.
     *
     * @throws An error if the socket is already open or there's an issue opening the connection.
     * @returns A Promise that resolves when the socket connection is successfully opened.
     */
    async open() {
        this.socket = await this.transportConnect.createSocket();
        this.socket.registerHandler(msg => this.handleSocketMessage(msg));
    }
    /**
     * Close the transport client's socket connection and remove all event listeners.
     * This method should be called when the client is no longer needed to ensure proper cleanup
     * and prevent potential memory leaks. Once closed, the client cannot be reused and a new
     * instance must be created if another connection is needed.
     */
    close() {
        this.socket?.close();
        this.socket = undefined;
        this.removeAllListeners();
    }
    /**
     * Sends a request to the TransportServer with the given payload and transferable objects.
     * The method will block until a response from the TransportServer's dispatch function is returned.
     * Request multiplexing is supported, allowing multiple requests to be sent concurrently.
     *
     * @param payload - The message payload to send to the server.
     * @param transfer - An optional array of ArrayBuffer, MessagePort, or ImageBitmap objects to transfer ownership.
     * @returns A Promise that resolves with the server's response data or rejects with an error message.
     */
    request(payload, transfer) {
        if (!this.socket) {
            throw new Error('Socket not open.');
        }
        const msgId = this.msgId++;
        const msg = { msgId, payload };
        log.debug(format(`->`, msg));
        return new Promise((resolve, reject) => {
            this.pendingRequests.push({ resolve, reject, msgId });
            this.socket.send(msg, transfer).catch(reject);
        });
    }
    /**
     * Handles incoming socket messages from the TransportServer, such as ResponseMessage and EventMessage.
     * If it's an EventMessage, emits an 'event_msg' event with the payload.
     * If it's a ResponseMessage, resolves or rejects the corresponding pending request based on the message content.
     *
     * @param msg - The ResponseMessage or EventMessage received from the TransportServer, or undefined if the remote socket closed.
     */
    handleSocketMessage(msg) {
        if (msg === undefined) {
            // The remote socket closed.
            this.close();
            return;
        }
        log.debug(format(`<-`, msg));
        if (isEventMessage(msg)) {
            this.emit('event_msg', msg.payload);
            return;
        }
        const reqIndex = this.pendingRequests.findIndex(r => r.msgId === msg.msgId);
        if (reqIndex === -1) {
            return;
        }
        const [pending] = this.pendingRequests.splice(reqIndex, 1);
        if (msg.error) {
            pending.reject(new Error(msg.error));
        }
        else {
            pending.resolve(msg.payload);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0X2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnQvdHJhbnNwb3J0X2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQTJDLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSWpHLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDLENBQUM7QUE4QnhEOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLGVBQXlCLFNBQVEsWUFBWTtJQUt4RCxZQUFvQixnQkFBMkI7UUFDN0MsS0FBSyxFQUFFLENBQUM7UUFEVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVc7UUFKdkMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLG9CQUFlLEdBQXFCLEVBQUUsQ0FBQztJQUsvQyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxPQUFPLENBQUMsT0FBZ0IsRUFBRSxRQUF5QjtRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE1BQU0sR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE1BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxtQkFBbUIsQ0FBQyxHQUFpRTtRQUMzRixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0Qiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTztRQUNULENBQUM7UUFDRCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNwQixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7Q0FDRiJ9