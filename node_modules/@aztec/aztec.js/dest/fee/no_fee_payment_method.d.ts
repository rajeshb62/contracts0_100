import { type FunctionCall } from '@aztec/circuit-types';
import { AztecAddress } from '@aztec/circuits.js';
import { type FeePaymentMethod } from './fee_payment_method.js';
/**
 * Does not pay fees. Will work until we enforce fee payment for all txs.
 */
export declare class NoFeePaymentMethod implements FeePaymentMethod {
    constructor();
    getAsset(): AztecAddress;
    getFunctionCalls(): Promise<FunctionCall[]>;
    getFeePayer(): Promise<AztecAddress>;
}
//# sourceMappingURL=no_fee_payment_method.d.ts.map