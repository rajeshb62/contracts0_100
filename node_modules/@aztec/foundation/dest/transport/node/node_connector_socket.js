/**
 * NodeConnectorSocket is a wrapper class that implements the Socket interface for messaging between
 * the main thread and worker threads in a Node.js environment. It uses the Worker API for
 * communication by sending and receiving messages through postMessage and handling messages using
 * event listeners.
 *
 * The send method sends messages to the worker thread, and the registerHandler method registers a
 * callback function to handle incoming messages from the worker. The close method cleans up
 * resources when the socket is no longer needed.
 */
export class NodeConnectorSocket {
    constructor(worker) {
        this.worker = worker;
    }
    /**
     * Sends a message from the NodeConnectorSocket instance to the associated worker thread.
     * The 'msg' can be any data type and 'transfer' is an optional array of transferable objects
     * that can be transferred with zero-copy semantics. The function returns a resolved Promise
     * once the message has been posted.
     *
     * @param msg - The message to send to the worker thread.
     * @param transfer - Optional array of Transferable objects to transfer ownership alongside the message.
     * @returns A Promise that resolves when the message has been posted.
     */
    send(msg, transfer = []) {
        this.worker.postMessage(msg, transfer);
        return Promise.resolve();
    }
    /**
     * Registers a callback function to handle incoming messages from the worker.
     * The provided callback will be executed whenever a message is received from
     * the worker, passing the message as its single argument.
     *
     * @param cb - The callback function to be called when a message is received.
     */
    registerHandler(cb) {
        this.worker.on('message', cb);
    }
    /**
     * Closes the worker connection and removes all event listeners.
     * Sends an undefined message to the worker for graceful termination.
     */
    close() {
        void this.send(undefined);
        this.worker.removeAllListeners();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9jb25uZWN0b3Jfc29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydC9ub2RlL25vZGVfY29ubmVjdG9yX3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLENBQUMsR0FBUSxFQUFFLFdBQTJCLEVBQUU7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQThCLENBQUMsQ0FBQztRQUM3RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZUFBZSxDQUFDLEVBQXFCO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGIn0=