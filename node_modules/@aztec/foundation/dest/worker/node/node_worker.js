import { Worker } from 'worker_threads';
import { NodeConnector, TransportClient, createDispatchProxy } from '../../transport/index.js';
import { WasmModule } from '../../wasm/wasm_module.js';
/**
 * Creates a node worker.
 */
export async function createNodeWorker(filepath, initialMem, maxMem) {
    const worker = new Worker(filepath);
    const transportConnect = new NodeConnector(worker);
    const transportClient = new TransportClient(transportConnect);
    await transportClient.open();
    const remoteModule = createDispatchProxy(WasmModule, transportClient);
    remoteModule.destroyWorker = async () => {
        await transportClient.request({ fn: '__destroyWorker__', args: [] });
        transportClient.close();
    };
    await remoteModule.init(initialMem, maxMem);
    return remoteModule;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV93b3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd29ya2VyL25vZGUvbm9kZV93b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBb0IsYUFBYSxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxVQUFtQixFQUFFLE1BQWU7SUFDM0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBYyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxlQUFlLENBQWUsQ0FBQztJQUNwRixZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ3RDLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRSxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIn0=