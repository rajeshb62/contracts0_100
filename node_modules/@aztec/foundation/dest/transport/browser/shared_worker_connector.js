import { MessagePortSocket } from './message_port_socket.js';
/**
 * SharedWorkerConnector is an implementation of the Connector interface, specifically for SharedWorkers.
 * It enables the creation of MessagePortSockets that communicate with a shared worker and allow
 * multiple scripts to communicate with the worker using the same connection.
 */
export class SharedWorkerConnector {
    constructor(worker) {
        this.worker = worker;
    }
    /**
     * Creates a new MessagePortSocket instance using the SharedWorker's port.
     * This method allows for easy creation of sockets to communicate with the SharedWorker.
     *
     * @returns A Promise that resolves to a new MessagePortSocket instance.
     */
    createSocket() {
        return Promise.resolve(new MessagePortSocket(this.worker.port));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl9jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNwb3J0L2Jyb3dzZXIvc2hhcmVkX3dvcmtlcl9jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFN0Q7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBb0IsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUFHLENBQUM7SUFFNUM7Ozs7O09BS0c7SUFDSCxZQUFZO1FBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRiJ9