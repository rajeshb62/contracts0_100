import { type FunctionCall } from '@aztec/circuit-types';
import { type GasSettings } from '@aztec/circuits.js';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { type AccountWallet } from '../wallet/account_wallet.js';
import { type FeePaymentMethod } from './fee_payment_method.js';
/**
 * Holds information about how the fee for a transaction is to be paid.
 */
export declare class PublicFeePaymentMethod implements FeePaymentMethod {
    /**
     * The asset used to pay the fee.
     */
    protected asset: AztecAddress;
    /**
     * Address which will hold the fee payment.
     */
    protected paymentContract: AztecAddress;
    /**
     * An auth witness provider to authorize fee payments
     */
    protected wallet: AccountWallet;
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
    wallet: AccountWallet);
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
//# sourceMappingURL=public_fee_payment_method.d.ts.map