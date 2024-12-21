import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PartialStateReference } from '../partial_state_reference.js';
import { ConstantRollupData } from './base_rollup.js';
/**
 * Output of the base and merge rollup circuits.
 */
export class BaseOrMergeRollupPublicInputs {
    constructor(
    /**
     * Specifies from which type of rollup circuit these inputs are from.
     */
    rollupType, 
    /**
     * Number of txs in this rollup.
     */
    numTxs, 
    /**
     * Data which is forwarded through the rollup circuits unchanged.
     */
    constants, 
    /**
     * Partial state reference at the start of the rollup circuit.
     */
    start, 
    /**
     * Partial state reference at the end of the rollup circuit.
     */
    end, 
    /**
     * SHA256 hash of transactions effects. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    txsEffectsHash, 
    /**
     * SHA256 hash of outhash. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    outHash, 
    /**
     * The summed `transaction_fee` of the constituent transactions.
     */
    accumulatedFees) {
        this.rollupType = rollupType;
        this.numTxs = numTxs;
        this.constants = constants;
        this.start = start;
        this.end = end;
        this.txsEffectsHash = txsEffectsHash;
        this.outHash = outHash;
        this.accumulatedFees = accumulatedFees;
    }
    /**
     * Deserializes from a buffer or reader.
     * Note: Corresponds to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized public inputs.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new BaseOrMergeRollupPublicInputs(reader.readNumber(), reader.readNumber(), reader.readObject(ConstantRollupData), reader.readObject(PartialStateReference), reader.readObject(PartialStateReference), 
        //TODO check
        Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.rollupType, this.numTxs, this.constants, this.start, this.end, this.txsEffectsHash, this.outHash, this.accumulatedFees);
    }
    /**
     * Serialize this as a hex string.
     * @returns - The hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new BaseOrMergeRollupPublicInputs instance.
     */
    static fromString(str) {
        return BaseOrMergeRollupPublicInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9vcl9tZXJnZV9yb2xsdXBfcHVibGljX2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JvbGx1cC9iYXNlX29yX21lcmdlX3JvbGx1cF9wdWJsaWNfaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDO0lBQ0U7O09BRUc7SUFDSSxVQUF1QjtJQUM5Qjs7T0FFRztJQUNJLE1BQWM7SUFDckI7O09BRUc7SUFDSSxTQUE2QjtJQUNwQzs7T0FFRztJQUNJLEtBQTRCO0lBQ25DOztPQUVHO0lBQ0ksR0FBMEI7SUFDakM7OztPQUdHO0lBQ0ksY0FBa0I7SUFDekI7OztPQUdHO0lBQ0ksT0FBVztJQUVsQjs7T0FFRztJQUNJLGVBQW1CO1FBL0JuQixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBSXZCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFJZCxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUk3QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUk1QixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQUsxQixtQkFBYyxHQUFkLGNBQWMsQ0FBSTtRQUtsQixZQUFPLEdBQVAsT0FBTyxDQUFJO1FBS1gsb0JBQWUsR0FBZixlQUFlLENBQUk7SUFDekIsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSw2QkFBNkIsQ0FDdEMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUNuQixNQUFNLENBQUMsVUFBVSxFQUFFLEVBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFDckMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUN4QyxNQUFNLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1FBQ3hDLFlBQVk7UUFDWixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUN0QixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFNBQVMsRUFFZCxJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxHQUFHLEVBRVIsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFFWixJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDM0IsT0FBTyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YifQ==