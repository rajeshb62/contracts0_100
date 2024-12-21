import { type Connector } from '../interface/connector.js';
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
export declare class WorkerConnector implements Connector {
    private worker;
    constructor(worker: Worker);
    /**
     * Creates a new MessagePortSocket instance by establishing a connection between the Worker and the main thread.
     * A MessageChannel is created, and one of its ports is sent to the Worker using postMessage.
     * The other port is used to create a new MessagePortSocket which is then returned as a Promise.
     *
     * @returns A Promise that resolves to a new MessagePortSocket instance.
     */
    createSocket(): Promise<MessagePortSocket>;
}
//# sourceMappingURL=worker_connector.d.ts.map