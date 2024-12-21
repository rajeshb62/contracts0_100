import { type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type EntrypointInterface, type ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { TxExecutionRequest } from '@aztec/circuit-types';
import { type AztecAddress } from '@aztec/circuits.js';
/**
 * Implementation for an entrypoint interface that follows the default entrypoint signature
 * for an account, which accepts an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
export declare class DefaultAccountEntrypoint implements EntrypointInterface {
    private address;
    private auth;
    private chainId;
    private version;
    constructor(address: AztecAddress, auth: AuthWitnessProvider, chainId?: number, version?: number);
    createTxExecutionRequest(exec: ExecutionRequestInit): Promise<TxExecutionRequest>;
    private getEntrypointAbi;
}
//# sourceMappingURL=account_entrypoint.d.ts.map