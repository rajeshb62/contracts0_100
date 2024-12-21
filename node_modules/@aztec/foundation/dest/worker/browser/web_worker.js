import { TransportClient, WorkerConnector, createDispatchProxy } from '../../transport/index.js';
import { WasmModule } from '../../wasm/index.js';
/**
 * Instantiate a web worker.
 * @param url - The URL.
 * @param initialMem - Initial memory pages.
 * @param maxMem - Maximum memory pages.
 * @returns The worker.
 */
export async function createWebWorker(url, initialMem, maxMem) {
    const worker = new Worker(url);
    const transportConnect = new WorkerConnector(worker);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX3dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93b3JrZXIvYnJvd3Nlci93ZWJfd29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdqRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGVBQWUsQ0FBQyxHQUFXLEVBQUUsVUFBbUIsRUFBRSxNQUFlO0lBQ3JGLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsTUFBTSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRSxNQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFlLENBQUM7SUFDcEYsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLElBQUksRUFBRTtRQUN0QyxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckUsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUNGLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUMsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyJ9