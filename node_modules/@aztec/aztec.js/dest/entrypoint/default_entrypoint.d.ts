import { TxExecutionRequest } from '@aztec/circuit-types';
import { type EntrypointInterface, type ExecutionRequestInit } from './entrypoint.js';
/**
 * Default implementation of the entrypoint interface. It calls a function on a contract directly
 */
export declare class DefaultEntrypoint implements EntrypointInterface {
    private chainId;
    private protocolVersion;
    constructor(chainId: number, protocolVersion: number);
    createTxExecutionRequest(exec: ExecutionRequestInit): Promise<TxExecutionRequest>;
}
//# sourceMappingURL=default_entrypoint.d.ts.map