import { type PXE } from '@aztec/circuit-types';
import { CompleteAddress } from '@aztec/circuits.js';
/**
 * Creates a random address and registers it as a recipient on the pxe server. Useful for testing.
 * @param pxe - PXE.
 * @returns Complete address of the registered recipient.
 */
export declare function createRecipient(pxe: PXE): Promise<CompleteAddress>;
//# sourceMappingURL=create_recipient.d.ts.map