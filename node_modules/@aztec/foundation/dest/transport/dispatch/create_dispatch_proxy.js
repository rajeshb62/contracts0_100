import { EventEmitter } from 'events';
import { isTransferDescriptor } from '../interface/transferable.js';
/**
 * Creates a proxy object for the provided class, wrapping each method in a request function.
 * The resulting proxy object allows invoking methods of the original class, but their execution
 * is delegated to the request function. This is useful when executing methods across different
 * environments or threads, such as Web Workers or Node.js processes.
 *
 * @typeParam T - The type of the class to create a proxy for.
 * @param class_ - The class constructor to create a proxy for.
 * @param requestFn - A higher-order function that takes a method name and returns a function
 *                    with the same signature as the original method, which wraps the actual
 *                    invocation in a custom logic (e.g., sending a message to another thread).
 * @returns An object whose methods match those of the original class, but whose execution is
 *          delegated to the provided request function.
 */
export function createDispatchProxyFromFn(class_, requestFn) {
    const proxy = class_.prototype instanceof EventEmitter ? new EventEmitter() : {};
    for (const fn of Object.getOwnPropertyNames(class_.prototype)) {
        if (fn === 'constructor') {
            continue;
        }
        proxy[fn] = requestFn(fn);
    }
    return proxy;
}
/**
 * Creates a proxy for the given class that transparently dispatches method calls over a transport client.
 * The proxy allows calling methods on remote instances of the class through the provided transport client
 * while maintaining the correct return types and handling promises. If the class inherits from EventEmitter,
 * it also handles event emissions through the transport client.
 *
 * @param class_ - The constructor function of the class to create the proxy for.
 * @param transportClient - The TransportClient instance used to handle communication between proxies.
 * @returns A proxified version of the given class with methods dispatched over the transport client.
 */
export function createDispatchProxy(class_, transportClient) {
    // Create a proxy of class_ that passes along methods over our transportClient
    const proxy = createDispatchProxyFromFn(class_, (fn) => (...args) => {
        // Pass our proxied function name and arguments over our transport client
        const transfer = args.reduce((acc, a) => (isTransferDescriptor(a) ? [...acc, ...a.transferables] : acc), []);
        args = args.map(a => (isTransferDescriptor(a) ? a.send : a));
        return transportClient.request({ fn, args }, transfer);
    });
    if (proxy instanceof EventEmitter) {
        // Handle proxied 'emit' calls if our proxy object is an EventEmitter
        transportClient.on('event_msg', ({ fn, args }) => {
            if (fn === 'emit') {
                const [eventName, ...restArgs] = args;
                proxy.emit(eventName, ...restArgs);
            }
        });
    }
    return proxy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2Rpc3BhdGNoX3Byb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydC9kaXNwYXRjaC9jcmVhdGVfZGlzcGF0Y2hfcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUV0QyxPQUFPLEVBQTJCLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUE0RTdGOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLE1BQW1DLEVBQ25DLFNBQTJEO0lBRTNELE1BQU0sS0FBSyxHQUFRLE1BQU0sQ0FBQyxTQUFTLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEYsS0FBSyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDOUQsSUFBSSxFQUFFLEtBQUssYUFBYSxFQUFFLENBQUM7WUFDekIsU0FBUztRQUNYLENBQUM7UUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLE1BQW1DLEVBQ25DLGVBQTZDO0lBRTdDLDhFQUE4RTtJQUM5RSxNQUFNLEtBQUssR0FBRyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtRQUNqRix5RUFBeUU7UUFDekUsTUFBTSxRQUFRLEdBQW1CLElBQUksQ0FBQyxNQUFNLENBQzFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzFFLEVBQW9CLENBQ3JCLENBQUM7UUFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFLENBQUM7UUFDbEMscUVBQXFFO1FBQ3JFLGVBQWUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUMvQyxJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIn0=