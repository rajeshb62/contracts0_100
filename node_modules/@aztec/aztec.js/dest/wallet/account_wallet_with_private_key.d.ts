import { type PXE } from '@aztec/circuit-types';
import { type Fr } from '@aztec/circuits.js';
import { type Salt } from '../account/index.js';
import { type AccountInterface } from '../account/interface.js';
import { AccountWallet } from './account_wallet.js';
/**
 * Extends {@link AccountWallet} with the encryption private key. Not required for
 * implementing the wallet interface but useful for testing purposes or exporting
 * an account to another pxe.
 */
export declare class AccountWalletWithSecretKey extends AccountWallet {
    private secretKey;
    /** Deployment salt for this account contract. */
    readonly salt: Salt;
    constructor(pxe: PXE, account: AccountInterface, secretKey: Fr, 
    /** Deployment salt for this account contract. */
    salt: Salt);
    /** Returns the encryption private key associated with this account. */
    getSecretKey(): Fr;
}
//# sourceMappingURL=account_wallet_with_private_key.d.ts.map