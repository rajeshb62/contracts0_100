import { defaultFetch } from '@aztec/foundation/json-rpc/client';
import { type AztecNode } from '../../interfaces/aztec-node.js';
/**
 * Creates a JSON-RPC client to remotely talk to an Aztec Node.
 * @param url - The URL of the Aztec Node.
 * @param fetch - The fetch implementation to use.
 * @returns A JSON-RPC client of Aztec Node.
 */
export declare function createAztecNodeClient(url: string, fetch?: typeof defaultFetch): AztecNode;
//# sourceMappingURL=aztec_node_client.d.ts.map