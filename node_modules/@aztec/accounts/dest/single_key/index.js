/**
 * The `@aztec/accounts/single_key` export provides a testing account contract implementation that uses a single Grumpkin key for both authentication and encryption.
 * It is not recommended to use this account type in production.
 *
 * @packageDocumentation
 */
import { AccountManager } from '@aztec/aztec.js/account';
import { getWallet } from '@aztec/aztec.js/wallet';
import { deriveMasterIncomingViewingSecretKey } from '@aztec/circuits.js';
import { SingleKeyAccountContract } from './account_contract.js';
export { SingleKeyAccountContract };
export { SchnorrSingleKeyAccountContractArtifact as SingleKeyAccountContractArtifact } from './artifact.js';
/**
 * Creates an Account that uses the same Grumpkin key for encryption and authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys (in this case also used to get signing key).
 * @param salt - Deployment salt.
 */
export function getSingleKeyAccount(pxe, secretKey, salt) {
    const encryptionPrivateKey = deriveMasterIncomingViewingSecretKey(secretKey);
    return new AccountManager(pxe, secretKey, new SingleKeyAccountContract(encryptionPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using Schnorr signatures with a single key for encryption and authentication.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - Grumpkin key used for note encryption and signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export function getSingleKeyWallet(pxe, address, signingKey) {
    return getWallet(pxe, address, new SingleKeyAccountContract(signingKey));
}
export { getSingleKeyAccount as getUnsafeSchnorrAccount, getSingleKeyWallet as getUnsafeSchnorrWallet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2luZ2xlX2tleS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUNILE9BQU8sRUFBRSxjQUFjLEVBQWEsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQXNCLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZFLE9BQU8sRUFBOEIsb0NBQW9DLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztBQUVwQyxPQUFPLEVBQUUsdUNBQXVDLElBQUksZ0NBQWdDLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUc7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsR0FBUSxFQUFFLFNBQWEsRUFBRSxJQUFXO0lBQ3RFLE1BQU0sb0JBQW9CLEdBQUcsb0NBQW9DLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0UsT0FBTyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksd0JBQXdCLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxHQUFRLEVBQ1IsT0FBcUIsRUFDckIsVUFBMEI7SUFFMUIsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVELE9BQU8sRUFBRSxtQkFBbUIsSUFBSSx1QkFBdUIsRUFBRSxrQkFBa0IsSUFBSSxzQkFBc0IsRUFBRSxDQUFDIn0=