import { type Connector } from '../interface/connector.js';
import { MessagePortSocket } from './message_port_socket.js';
/**
 * SharedWorkerConnector is an implementation of the Connector interface, specifically for SharedWorkers.
 * It enables the creation of MessagePortSockets that communicate with a shared worker and allow
 * multiple scripts to communicate with the worker using the same connection.
 */
export declare class SharedWorkerConnector implements Connector {
    private worker;
    constructor(worker: SharedWorker);
    /**
     * Creates a new MessagePortSocket instance using the SharedWorker's port.
     * This method allows for easy creation of sockets to communicate with the SharedWorker.
     *
     * @returns A Promise that resolves to a new MessagePortSocket instance.
     */
    createSocket(): Promise<MessagePortSocket>;
}
//# sourceMappingURL=shared_worker_connector.d.ts.map