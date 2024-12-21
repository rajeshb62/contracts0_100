import { isTransferDescriptor } from './interface/transferable.js';
/**
 * Keeps track of clients, providing a broadcast, and request/response api with multiplexing.
 */
export class TransportServer {
    constructor(listener, msgHandlerFn) {
        this.listener = listener;
        this.msgHandlerFn = msgHandlerFn;
        this.sockets = [];
    }
    /**
     * Starts the TransportServer, allowing it to accept new connections and handle incoming messages.
     * The server will listen for 'new_socket' events from the underlying listener and invoke the provided message handler function
     * for each received message. The server remains active until the 'stop' method is called.
     */
    start() {
        this.listener.on('new_socket', client => this.handleNewSocket(client));
        this.listener.open();
    }
    /**
     * Stops accepting new connections. It doesn't close existing sockets.
     * It's expected the clients will gracefully complete by closing their end, sending an `undefined` message.
     */
    stop() {
        this.listener.close();
    }
    /**
     * Sends a broadcast message to all connected clients.
     * The given payload will be sent to all the clients currently connected to the TransportServer.
     * It waits for all the messages to be sent and resolves when they are all sent successfully.
     *
     * @param msg - The payload to broadcast to all connected clients.
     * @returns A Promise that resolves when all messages have been sent successfully.
     */
    async broadcast(msg) {
        await Promise.all(this.sockets.map(s => s.send({ payload: msg })));
    }
    /**
     * Handles the addition of a new socket to the server by registering a message handler for the client
     * and adding the socket to the list of active sockets. The message handler processes incoming messages
     * from the client, including detecting client disconnection and removing the closed socket.
     *
     * @param socket - The new Socket instance that has connected to the server.
     */
    handleNewSocket(socket) {
        socket.registerHandler(async (msg) => {
            if (msg === undefined) {
                // Client socket has closed. Remove it from the list of sockets. Call close on it for any cleanup.
                const socketIndex = this.sockets.findIndex(s => s === socket);
                const [closingSocket] = this.sockets.splice(socketIndex, 1);
                closingSocket.close();
                return;
            }
            return await this.handleSocketMessage(socket, msg);
        });
        this.sockets.push(socket);
    }
    /**
     * Detect the 'transferables' argument to our socket from our message
     * handler return type.
     * @param data - The compound payload data.
     * @returns The split data and transferables.
     */
    getPayloadAndTransfers(data) {
        if (isTransferDescriptor(data)) {
            // We treat PayloadWithTransfers specially so that we're able to
            // attach transferables while keeping a simple return-type based usage
            return [data.send, data.transferables];
        }
        if (data instanceof Uint8Array) {
            // We may want to devise a better solution to this. We maybe given a view over a non cloneable/transferrable
            // ArrayBuffer (such as a view over wasm memory). In this case we want to take a copy, and then transfer it.
            const respPayload = data instanceof Uint8Array && ArrayBuffer.isView(data) ? new Uint8Array(data) : data;
            const transferables = data instanceof Uint8Array ? [respPayload.buffer] : [];
            return [respPayload, transferables];
        }
        return [data, []];
    }
    /**
     * Handles incoming socket messages, processing the request and sending back a response.
     * This function is responsible for invoking the registered message handler function with the received
     * payload, extracting the result and transferables, and sending a response message back to the client.
     * In case of an error during message handling, it sends an error response with the stack trace.
     *
     * @param socket - The Socket instance from which the message was received.
     * @param msg - The RequestMessage object containing the message ID and payload.
     */
    async handleSocketMessage(socket, { msgId, payload }) {
        try {
            const data = await this.msgHandlerFn(payload);
            const [respPayload, transferables] = this.getPayloadAndTransfers(data);
            const rep = { msgId, payload: respPayload };
            await socket.send(rep, transferables);
        }
        catch (err) {
            const rep = { msgId, error: err.stack };
            await socket.send(rep);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0X3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnQvdHJhbnNwb3J0X3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRTs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBRzFCLFlBQW9CLFFBQWtCLEVBQVUsWUFBNEM7UUFBeEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQztRQUZwRixZQUFPLEdBQWEsRUFBRSxDQUFDO0lBRWdFLENBQUM7SUFFaEc7Ozs7T0FJRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQVk7UUFDMUIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssZUFBZSxDQUFDLE1BQWM7UUFDcEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDakMsSUFBSSxHQUFHLEtBQUssU0FBUyxF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