import { type AccountWalletWithSecretKey } from '@aztec/aztec.js/wallet';
import { type PXE } from '@aztec/circuit-types';
import { Fr } from '@aztec/foundation/fields';
export declare const INITIAL_TEST_SECRET_KEYS: Fr[];
export declare const INITIAL_TEST_ENCRYPTION_KEYS: import("@aztec/aztec.js").Fq[];
export declare const INITIAL_TEST_SIGNING_KEYS: import("@aztec/aztec.js").Fq[];
export declare const INITIAL_TEST_ACCOUNT_SALTS: Fr[];
/**
 * Gets a collection of wallets for the Aztec accounts that are initially stored in the test environment.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
export declare function getInitialTestAccountsWallets(pxe: PXE): Promise<AccountWalletWithSecretKey[]>;
/**
 * Queries a PXE for it's registered accounts and returns wallets for those accounts using keys in the initial test accounts.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
export declare function getDeployedTestAccountsWallets(pxe: PXE): Promise<AccountWalletWithSecretKey[]>;
/**
 * Deploys the initial set of schnorr signature accounts to the test environment
 * @param pxe - PXE instance.
 * @returns The set of deployed Account objects and associated private encryption keys
 */
export declare function deployInitialTestAccounts(pxe: PXE): Promise<{
    account: import("@aztec/aztec.js").AccountManager;
    secretKey: Fr;
}[]>;
//# sourceMappingURL=configuration.d.ts.map