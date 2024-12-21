import { type AbiType } from './abi.js';
/**
 * Returns whether the ABI type is an Aztec or Ethereum Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export declare function isAddressStruct(abiType: AbiType): boolean;
/**
 * Returns whether the ABI type is an Ethereum Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export declare function isEthAddressStruct(abiType: AbiType): boolean;
/**
 * Returns whether the ABI type is an Aztec Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export declare function isAztecAddressStruct(abiType: AbiType): boolean;
/**
 * Returns whether the ABI type is an Function Selector defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export declare function isFunctionSelectorStruct(abiType: AbiType): boolean;
/**
 * Returns whether the ABI type is a struct with a single `inner` field.
 * @param abiType - Type to check.
 */
export declare function isWrappedFieldStruct(abiType: AbiType): boolean;
//# sourceMappingURL=utils.d.ts.map