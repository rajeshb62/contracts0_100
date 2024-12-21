import EventEmitter from 'events';
import { parentPort } from 'worker_threads';
import { NodeListenerSocket } from './node_listener_socket.js';
/**
 * NodeListener is an event-driven class that extends EventEmitter and implements the Listener interface.
 * It provides methods to open and close communication with a worker thread using the NodeListenerSocket.
 * The 'new_socket' event is emitted when a new NodeListenerSocket instance is created, allowing for
 * efficient processing of incoming messages from the parent thread.
 */
export class NodeListener extends EventEmitter {
    constructor() {
        super();
    }
    /**
     * Opens a new connection to a parent worker thread and emits an event with the created NodeListenerSocket instance.
     * The 'new_socket' event can be listened for, providing access to the newly created NodeListenerSocket.
     *
     * Fires NodeListener#new_socket.
     */
    open() {
        this.emit('new_socket', new NodeListenerSocket(parentPort));
    }
    /**
     * Closes the NodeListener instance.
     * This method currently has no implementation, as there is no need to perform any actions
     * when closing a NodeListener. It exists for compatibility with the Listener interface.
     */
    close() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc3BvcnQvbm9kZS9ub2RlX2xpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFL0Q7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sWUFBYSxTQUFRLFlBQVk7SUFDNUM7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLGtCQUFrQixDQUFDLFVBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxLQUFJLENBQUM7Q0FDWCJ9