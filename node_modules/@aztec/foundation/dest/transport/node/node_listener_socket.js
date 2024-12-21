/**
 * An implementation of a TransportSocket using MessagePorts.
 */
export class NodeListenerSocket {
    constructor(port) {
        this.port = port;
    }
    /**
     * Sends a message through the MessagePort along with any provided Transferables.
     * The transfer list allows for efficient sending of certain types of data,
     * such as ArrayBuffer, ImageBitmap, and MessagePort.
     * The Promise resolves once the message has been successfully sent.
     *
     * @param msg - The message to be sent through the MessagePort.
     * @param transfer - An optional array of Transferable objects to be transferred.
     * @returns A Promise that resolves once the message has been sent.
     */
    send(msg, transfer = []) {
        this.port.postMessage(msg, transfer);
        return Promise.resolve();
    }
    /**
     * Registers a callback function to handle incoming messages from the MessagePort.
     * When a message is received, the provided callback function will be invoked with
     * the received message as its argument. This method allows for efficient and
     * dynamic handling of incoming data in a NodeListenerSocket instance.
     *
     * @param cb - The callback function to process incoming messages.
     */
    registerHandler(cb) {
        this.port.on('message', cb);
    }
    /**
     * Closes the NodeListenerSocket instance, removing all listeners and closing the underlying MessagePort.
     * Sends an undefined message to notify any connected ports about the closure before removing event listeners
     * and cleaning up resources. This method should be called when the socket is no longer needed to avoid memory leaks.
     */
    close() {
        void this.send(undefined);
        this.port.removeAllListeners();
        this.port.close();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9saXN0ZW5lcl9zb2NrZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNwb3J0L25vZGUvbm9kZV9saXN0ZW5lcl9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7SUFBRyxDQUFDO0lBRXpDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksQ0FBQyxHQUFRLEVBQUUsV0FBMkIsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBOEIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsZUFBZSxDQUFDLEVBQXFCO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUs7UUFDSCxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNGIn0=