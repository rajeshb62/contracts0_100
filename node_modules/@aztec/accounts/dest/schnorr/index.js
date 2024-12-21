/**
 * The `@aztec/accounts/schnorr` export provides an account contract implementation that uses Schnorr signatures with a Grumpkin key for authentication, and a separate Grumpkin key for encryption.
 * This is the suggested account contract type for most use cases within Aztec.
 *
 * @packageDocumentation
 */
import { AccountManager } from '@aztec/aztec.js/account';
import { getWallet } from '@aztec/aztec.js/wallet';
import { SchnorrAccountContract } from './account_contract.js';
export { SchnorrAccountContract };
export { SchnorrAccountContractArtifact } from './artifact.js';
/**
 * Creates an Account Manager that relies on a Grumpkin signing key for authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys.
 * @param signingPrivateKey - Grumpkin key used for signing transactions.
 * @param salt - Deployment salt.
 */
export function getSchnorrAccount(pxe, secretKey, signingPrivateKey, salt) {
    return new AccountManager(pxe, secretKey, new SchnorrAccountContract(signingPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using Schnorr signatures.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - Grumpkin key used for signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export function getSchnorrWallet(pxe, address, signingPrivateKey) {
    return getWallet(pxe, address, new SchnorrAccountContract(signingPrivateKey));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2Nobm9yci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUNILE9BQU8sRUFBRSxjQUFjLEVBQWEsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQXNCLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXZFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDO0FBRWxDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLEdBQVEsRUFDUixTQUFhLEVBQ2IsaUJBQWlDLEVBQ2pDLElBQVc7SUFFWCxPQUFPLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pHLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLEdBQVEsRUFDUixPQUFxQixFQUNyQixpQkFBaUM7SUFFakMsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDIn0=