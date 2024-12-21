/**
 * Returns whether the ABI type is an Aztec or Ethereum Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export function isAddressStruct(abiType) {
    return isEthAddressStruct(abiType) || isAztecAddressStruct(abiType);
}
/**
 * Returns whether the ABI type is an Ethereum Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export function isEthAddressStruct(abiType) {
    return abiType.kind === 'struct' && abiType.path.endsWith('address::EthAddress');
}
/**
 * Returns whether the ABI type is an Aztec Address defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export function isAztecAddressStruct(abiType) {
    return abiType.kind === 'struct' && abiType.path.endsWith('address::AztecAddress');
}
/**
 * Returns whether the ABI type is an Function Selector defined in Aztec.nr.
 * @param abiType - Type to check.
 * @returns Boolean.
 */
export function isFunctionSelectorStruct(abiType) {
    return abiType.kind === 'struct' && abiType.path.endsWith('types::abis::function_selector::FunctionSelector');
}
/**
 * Returns whether the ABI type is a struct with a single `inner` field.
 * @param abiType - Type to check.
 */
export function isWrappedFieldStruct(abiType) {
    return (abiType.kind === 'struct' &&
        abiType.fields.length === 1 &&
        abiType.fields[0].name === 'inner' &&
        abiType.fields[0].type.kind === 'field');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJpL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLE9BQWdCO0lBQzlDLE9BQU8sa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsT0FBZ0I7SUFDakQsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQWdCO0lBQ25ELE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxPQUFnQjtJQUN2RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtEQUFrRCxDQUFDLENBQUM7QUFDaEgsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUFnQjtJQUNuRCxPQUFPLENBQ0wsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTztRQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUN4QyxDQUFDO0FBQ0osQ0FBQyJ9