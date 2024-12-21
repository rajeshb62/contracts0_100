import { Fr, PUBLIC_DATA_TREE_HEIGHT, PublicDataTreeLeafPreimage } from '@aztec/circuits.js';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { SiblingPath } from './sibling_path/sibling_path.js';
/**
 * Public data witness.
 * @remarks This allows to prove either:
 * - That a slot in the public data tree is empty (0 value) if it falls within the range of the leaf.
 * - The current value of a slot in the public data tree if it matches exactly the slot of the leaf.
 */
export class PublicDataWitness {
    constructor(
    /**
     * The index of the leaf in the public data tree.
     */
    index, 
    /**
     * Preimage of a low leaf. All the slots in the range of the leaf are empty, and the current value of the
     * leaf slot is stored in the leaf.
     */
    leafPreimage, 
    /**
     * Sibling path to prove membership of the leaf.
     */
    siblingPath) {
        this.index = index;
        this.leafPreimage = leafPreimage;
        this.siblingPath = siblingPath;
    }
    /**
     * Returns a field array representation of a public data witness.
     * @returns A field array representation of a public data witness.
     */
    toFields() {
        return [
            new Fr(this.index),
            new Fr(this.leafPreimage.slot),
            new Fr(this.leafPreimage.value),
            new Fr(this.leafPreimage.nextIndex),
            new Fr(this.leafPreimage.nextSlot),
            ...this.siblingPath.toFields(),
        ];
    }
    toBuffer() {
        return serializeToBuffer([this.index, this.leafPreimage, this.siblingPath]);
    }
    /**
     * Returns a string representation of the TxEffect object.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes an PublicDataWitness object from a buffer.
     * @param buf - Buffer or BufferReader to deserialize.
     * @returns An instance of PublicDataWitness.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataWitness(toBigIntBE(reader.readBytes(32)), reader.readObject(PublicDataTreeLeafPreimage), SiblingPath.fromBuffer(reader.readBytes(4 + 32 * PUBLIC_DATA_TREE_HEIGHT)));
    }
    /**
     * Deserializes an PublicDataWitness object from a string.
     * @param str - String to deserialize.
     * @returns An instance of PublicDataWitness.
     */
    static fromString(str) {
        return PublicDataWitness.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfd2l0bmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaWNfZGF0YV93aXRuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU3RDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7SUFDRTs7T0FFRztJQUNhLEtBQWE7SUFDN0I7OztPQUdHO0lBQ2EsWUFBd0M7SUFDeEQ7O09BRUc7SUFDYSxXQUF3RDtRQVR4RCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBS2IsaUJBQVksR0FBWixZQUFZLENBQTRCO1FBSXhDLGdCQUFXLEdBQVgsV0FBVyxDQUE2QztJQUN2RSxDQUFDO0lBRUo7OztPQUdHO0lBQ0ksUUFBUTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzlCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQ25DLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ2xDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sSUFBSSxpQkFBaUIsQ0FDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxFQUM3QyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRiJ9