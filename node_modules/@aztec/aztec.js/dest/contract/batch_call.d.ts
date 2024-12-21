import { type FunctionCall, type TxExecutionRequest } from '@aztec/circuit-types';
import { type Wallet } from '../account/index.js';
import { BaseContractInteraction, type SendMethodOptions } from './base_contract_interaction.js';
import type { SimulateMethodOptions } from './contract_function_interaction.js';
/** A batch of function calls to be sent as a single transaction through a wallet. */
export declare class BatchCall extends BaseContractInteraction {
    protected calls: FunctionCall[];
    constructor(wallet: Wallet, calls: FunctionCall[]);
    /**
     * Create a transaction execution request that represents this batch, encoded and authenticated by the
     * user's wallet, ready to be simulated.
     * @param opts - An optional object containing additional configuration for the transaction.
     * @returns A Promise that resolves to a transaction instance.
     */
    create(opts?: SendMethodOptions): Promise<TxExecutionRequest>;
    /**
     * Simulate a transaction and get its return values
     * Differs from prove in a few important ways:
     * 1. It returns the values of the function execution
     * 2. It supports `unconstrained`, `private` and `public` functions
     *
     * @param options - An optional object containing additional configuration for the transaction.
     * @returns The result of the transaction as returned by the contract function.
     */
    simulate(options?: SimulateMethodOptions): Promise<any>;
}
//# sourceMappingURL=batch_call.d.ts.map