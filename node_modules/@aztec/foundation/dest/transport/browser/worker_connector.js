import { MessagePortSocket } from './message_port_socket.js';
/**
 * WorkerConnector is a class implementing the Connector interface for creating communication sockets
 * with Web Workers. It allows to establish a connection with the worker and create MessagePortSockets
 * using MessageChannels, enabling seamless communication between the main thread and worker threads.
 *
 * @example
 * const worker = new Worker('./myWorker.js');
 * const connector = new WorkerConnector(worker);
 * const socket = await connector.createSocket();
 * socket.send('Hello, worker!');
 */
export class WorkerConnector {
    constructor(worker) {
        this.worker = worker;
    }
    /**
     * Creates a new MessagePortSocket instance by establishing a connection between the Worker and the main thread.
     * A MessageChannel is created, and one of its ports is sent to the Worker using postMessage.
     * The other port is used to create a new MessagePortSocket which is then returned as a Promise.
     *
     * @returns A Promise that resolves to a new MessagePortSocket instance.
     */
    createSocket() {
        const channel = new MessageChannel();
        this.worker.postMessage('', [channel.port2]);
        return Promise.resolve(new MessagePortSocket(channel.port1));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2Nvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc3BvcnQvYnJvd3Nlci93b3JrZXJfY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTdEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFdEM7Ozs7OztPQU1HO0lBQ0gsWUFBWTtRQUNWLE1BQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGIn0=