import { type RemoteObject } from 'comlink';
import { type DebugLogger } from '../../log/index.js';
import { type JsonClassConverterInput, type StringClassConverterInput } from '../class_converter.js';
export { JsonStringify } from '../convert.js';
/**
 * A normal fetch function that does not retry.
 * Alternatives are a fetch function with retries, or a mocked fetch.
 * @param host - The host URL.
 * @param method - The RPC method name.
 * @param body - The RPC payload.
 * @param noRetry - Whether to throw a `NoRetryError` in case the response is a 5xx error and the body contains an error
 *                  message (see `retry` function for more details).
 * @returns The parsed JSON response, or throws an error.
 */
export declare function defaultFetch(host: string, rpcMethod: string, body: any, useApiEndpoints: boolean, noRetry?: boolean): Promise<any>;
/**
 * Makes a fetch function that retries based on the given attempts.
 * @param retries - Sequence of intervals (in seconds) to retry.
 * @param noRetry - Whether to stop retries on server errors.
 * @param log - Optional logger for logging attempts.
 * @returns A fetch function.
 */
export declare function makeFetch(retries: number[], noRetry: boolean, log?: DebugLogger): (host: string, rpcMethod: string, body: any, useApiEndpoints: boolean) => Promise<any>;
/**
 * Creates a Proxy object that delegates over RPC and satisfies RemoteObject<T>.
 * The server should have ran new JsonRpcServer().
 * @param host - The host URL.
 * @param stringClassMap - A map of class names to string representations.
 * @param objectClassMap - A map of class names to class constructors.
 * @param useApiEndpoints - Whether to use the API endpoints or the default RPC endpoint.
 * @param namespaceMethods - String value (or false/empty) to namespace all methods sent to the server. e.g. 'getInfo' -\> 'pxe_getInfo'
 * @param fetch - The fetch implementation to use.
 */
export declare function createJsonRpcClient<T extends object>(host: string, stringClassMap: StringClassConverterInput, objectClassMap: JsonClassConverterInput, useApiEndpoints: boolean, namespaceMethods?: string | false, fetch?: typeof defaultFetch): RemoteObject<T>;
//# sourceMappingURL=json_rpc_client.d.ts.map