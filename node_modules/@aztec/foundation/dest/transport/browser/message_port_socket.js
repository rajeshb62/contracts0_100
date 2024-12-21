/**
 * An implementation of a TransportSocket using MessagePorts.
 */
export class MessagePortSocket {
    constructor(port) {
        this.port = port;
    }
    /**
     * Send a message to the connected MessagePort, optionally transferring ownership of certain objects.
     * The 'msg' parameter can be any structured data type and will be sent to the other end of the MessagePort.
     * The optional 'transfer' parameter is an array of Transferable objects whose ownership will be transferred,
     * making them inaccessible on the sending side. This can improve performance for large data transfers.
     *
     * @param msg - The message to be sent through the MessagePort.
     * @param transfer - An optional array of Transferable objects to transfer ownership.
     * @returns A Promise that resolves when the message has been sent.
     */
    send(msg, transfer = []) {
        this.port.postMessage(msg, transfer);
        return Promise.resolve();
    }
    /**
     * Register a callback function to handle incoming messages from the MessagePort.
     * The provided callback will be invoked with the message data whenever a new message arrives.
     * Note that only one callback can be registered at a time. Subsequent calls to this method
     * will overwrite the previously registered callback.
     *
     * @param cb - The callback function to handle incoming messages.
     */
    registerHandler(cb) {
        this.port.onmessage = event => cb(event.data);
    }
    /**
     * Close the MessagePort, unregister the message handler, and send an undefined message.
     * The 'close' function is useful for gracefully shutting down a connection between two
     * endpoints by sending an undefined message as an indication of disconnection before
     * closing the port. After calling this method, the MessagePortSocket instance should not
     * be used again.
     */
    close() {
        void this.send(undefined);
        this.port.onmessage = null;
        this.port.close();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9wb3J0X3NvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc3BvcnQvYnJvd3Nlci9tZXNzYWdlX3BvcnRfc29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFvQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUcsQ0FBQztJQUV6Qzs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLENBQUMsR0FBUSxFQUFFLFdBQTJCLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsZUFBZSxDQUFDLEVBQXFCO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSztRQUNILEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0YifQ==