import { serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Implementation of a vector. Matches how we are serializing and deserializing vectors in cpp (length in the first position, followed by the items).
 */
export class Vector {
    constructor(
    /**
     * Items in the vector.
     */
    items) {
        this.items = items;
    }
    toBuffer() {
        return serializeToBuffer(this.items.length, this.items);
    }
    toFriendlyJSON() {
        return this.items;
    }
}
/**
 * CircuitType replaces ComposerType for now. When using Plonk, CircuitType is equivalent to the information of the proving system that will be used
 * to construct a proof. In the future Aztec zk stack, more information must be specified (e.g., the curve over which circuits are  constructed;
 * Plonk vs Honk; zk-SNARK or just SNARK; etc).
 */
export var CircuitType;
(function (CircuitType) {
    CircuitType[CircuitType["STANDARD"] = 0] = "STANDARD";
    CircuitType[CircuitType["ULTRA"] = 1] = "ULTRA";
})(CircuitType || (CircuitType = {}));
/**
 * Rollup types.
 */
export var RollupTypes;
(function (RollupTypes) {
    RollupTypes[RollupTypes["Base"] = 0] = "Base";
    RollupTypes[RollupTypes["Merge"] = 1] = "Merge";
    RollupTypes[RollupTypes["Root"] = 2] = "Root";
})(RollupTypes || (RollupTypes = {}));
/**
 * String encoding of serialized buffer data
 */
export const STRING_ENCODING = 'hex';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRjs7R0FFRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBQ2pCO0lBQ0U7O09BRUc7SUFDSSxLQUFVO1FBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUNoQixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQU9EOzs7O0dBSUc7QUFDSCxNQUFNLENBQU4sSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLHFEQUFZLENBQUE7SUFDWiwrQ0FBUyxDQUFBO0FBQ1gsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLDZDQUFRLENBQUE7SUFDUiwrQ0FBUyxDQUFBO0lBQ1QsNkNBQVEsQ0FBQTtBQUNWLENBQUMsRUFKVyxXQUFXLEtBQVgsV0FBVyxRQUl0QjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFtQixLQUFLLENBQUMifQ==