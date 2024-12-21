import { type PXE } from '@aztec/circuit-types';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { type AccountContract } from '../account/contract.js';
import { AccountWallet } from './account_wallet.js';
export * from '../account/wallet.js';
export * from './account_wallet.js';
export * from './account_wallet_with_private_key.js';
export * from './signerless_wallet.js';
/**
 * Gets a wallet for an already registered account.
 * @param pxe - PXE Service instance.
 * @param address - Address for the account.
 * @param accountContract - Account contract implementation.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export declare function getWallet(pxe: PXE, address: AztecAddress, accountContract: AccountContract): Promise<AccountWallet>;
//# sourceMappingURL=index.d.ts.map