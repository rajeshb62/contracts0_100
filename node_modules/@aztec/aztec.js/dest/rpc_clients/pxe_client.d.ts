import { type PXE } from '@aztec/circuit-types';
/**
 * Creates a JSON-RPC client to remotely talk to PXE.
 * @param url - The URL of the PXE.
 * @param fetch - The fetch implementation to use.
 * @returns A JSON-RPC client of PXE.
 */
export declare const createPXEClient: (url: string, fetch?: (host: string, rpcMethod: string, body: any, useApiEndpoints: boolean) => Promise<any>) => PXE;
//# sourceMappingURL=pxe_client.d.ts.map