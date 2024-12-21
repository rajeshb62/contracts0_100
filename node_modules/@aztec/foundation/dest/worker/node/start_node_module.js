import { parentPort } from 'worker_threads';
import { NodeListener, TransportServer } from '../../transport/index.js';
if (!parentPort) {
    throw new Error('InvalidWorker');
}
/**
 * Start the transport server corresponding to this module.
 * @param module - The WasmModule to host.
 */
export function startNodeModule(module) {
    const dispatch = async ({ fn, args }) => {
        if (fn === '__destroyWorker__') {
            transportServer.stop();
            return;
        }
        if (!module[fn]) {
            throw new Error(`dispatch error, function not found: ${fn}`);
        }
        return await module[fn](...args);
    };
    const transportListener = new NodeListener();
    const transportServer = new TransportServer(transportListener, dispatch);
    module.addLogger((...args) => transportServer.broadcast({ fn: 'emit', args: ['log', ...args] }));
    transportServer.start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRfbm9kZV9tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd29ya2VyL25vZGUvc3RhcnRfbm9kZV9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBb0IsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQWtCO0lBQ2hELE1BQU0sUUFBUSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQWUsRUFBRSxFQUFFO1FBQ25ELElBQUksRUFBRSxLQUFLLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFFLE1BQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELE9BQU8sTUFBTyxNQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFDRixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDN0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUIsQ0FBQyJ9