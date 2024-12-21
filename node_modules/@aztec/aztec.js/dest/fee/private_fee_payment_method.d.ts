import { type FunctionCall } from '@aztec/circuit-types';
import { type GasSettings } from '@aztec/circuits.js';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type Wallet } from '../account/wallet.js';
import { type FeePaymentMethod } from './fee_payment_method.js';
/**
 * Holds information about how the fee for a transaction is to be paid.
 */
export declare class PrivateFeePaymentMethod implements FeePaymentMethod {
    /**
     * The asset used to pay the fee.
     */
    private asset;
    /**
     * Address which will hold the fee payment.
     */
    private paymentContract;
    /**
     * An auth witness provider to authorize fee payments
     */
    private wallet;
    /**
     * A secret to shield the rebate amount from the FPC.
     * Use this to claim the shielded amount to private balance
     */
    private rebateSecret;
    constructor(
    /**
     * The asset used to pay the fee.
     */
    asset: AztecAddress, 
    /**
     * Address which will hold the fee payment.
     */
    paymentContract: AztecAddress, 
    /**
     * An auth witness provider to authorize fee payments
     */
    wallet: Wallet, 
    /**
     * A secret to shield the rebate amount from the FPC.
     * Use this to claim the shielded amount to private balance
     */
    rebateSecret?: Fr);
    /**
     * The asset used to pay the fee.
     * @returns The asset used to pay the fee.
     */
    getAsset(): AztecAddress;
    getFeePayer(): Promise<AztecAddress>;
    /**
     * Creates a function call to pay the fee in the given asset.
     * @param gasSettings - The gas settings.
     * @returns The function call to pay the fee.
     */
    getFunctionCalls(gasSettings: GasSettings): Promise<FunctionCall[]>;
}
//# sourceMappingURL=private_fee_payment_method.d.ts.map