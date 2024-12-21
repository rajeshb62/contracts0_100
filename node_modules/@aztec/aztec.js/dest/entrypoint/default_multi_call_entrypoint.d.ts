import { type EntrypointInterface, type ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { TxExecutionRequest } from '@aztec/circuit-types';
import { type AztecAddress } from '@aztec/circuits.js';
/**
 * Implementation for an entrypoint interface that can execute multiple function calls in a single transaction
 */
export declare class DefaultMultiCallEntrypoint implements EntrypointInterface {
    private chainId;
    private version;
    private address;
    constructor(chainId: number, version: number, address?: AztecAddress);
    createTxExecutionRequest(executions: ExecutionRequestInit): Promise<TxExecutionRequest>;
    private getEntrypointAbi;
}
//# sourceMappingURL=default_multi_call_entrypoint.d.ts.map