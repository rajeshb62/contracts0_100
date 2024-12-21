import { NodeConnectorSocket } from './node_connector_socket.js';
/**
 * The NodeConnector class is a concrete implementation of the Connector interface, utilizing worker_threads for
 * efficient parallel execution. This class provides an easy way to establish a connection with a Worker instance,
 * allowing seamless communication via sockets.
 *
 * @example
 * const worker = new Worker('./path/to/worker.js');
 * const nodeConnector = new NodeConnector(worker);
 * const socket = await nodeConnector.createSocket();
 * socket.send('Hello from main thread!');
 */
export class NodeConnector {
    constructor(worker) {
        this.worker = worker;
    }
    /**
     * Creates a new instance of NodeConnectorSocket using the worker provided in the constructor.
     * The createSocket method is used to establish connections using the worker_threads module,
     * allowing for efficient and fast communication between different parts of the application.
     *
     * @returns A Promise that resolves to a newly created NodeConnectorSocket instance.
     */
    createSocket() {
        return Promise.resolve(new NodeConnectorSocket(this.worker));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNwb3J0L25vZGUvbm9kZV9jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFakU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV0Qzs7Ozs7O09BTUc7SUFDSCxZQUFZO1FBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGIn0=