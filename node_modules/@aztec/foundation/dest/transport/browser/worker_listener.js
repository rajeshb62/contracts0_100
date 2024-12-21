import EventEmitter from 'events';
import { MessagePortSocket } from './message_port_socket.js';
/**
 * WorkerListener is a class that extends EventEmitter and implements the Listener interface.
 * It listens for incoming connections on a dedicated worker global scope, and emits a 'new_socket' event
 * with a MessagePortSocket instance for each new connection. This allows applications to communicate
 * with other workers or main thread through the MessagePortSocket abstraction.
 *
 * The open() method starts listening for incoming connections, while the close() method stops it.
 */
export class WorkerListener extends EventEmitter {
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
     * Initializes the WorkerListener by setting the 'onmessage' event handler of the worker.
     * The 'onmessage' event will be triggered when the worker receives a message, and it will then
     * call the handleMessageEvent method to handle incoming connections.
     */
    open() {
        this.worker.onmessage = this.handleMessageEvent;
    }
    /**
     * Close the worker listener by removing the 'onmessage' event handler.
     * This method effectively stops the WorkerListener from reacting to new incoming messages.
     */
    close() {
        this.worker.onmessage = () => { };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2xpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydC9icm93c2VyL3dvcmtlcl9saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSxRQUFRLENBQUM7QUFHbEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFhN0Q7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxjQUFlLFNBQVEsWUFBWTtJQUM5QyxZQUFvQixNQUFrQztRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQURVLFdBQU0sR0FBTixNQUFNLENBQTRCO1FBcUI5Qyx1QkFBa0IsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1YsT0FBTztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBekJGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBU0YifQ==