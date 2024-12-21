import { toBigIntBE, toBufferBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Class containing the data of a preimage of a single leaf in the public data tree.
 * Note: It's called preimage because this data gets hashed before being inserted as a node into the `IndexedTree`.
 */
export class PublicDataTreeLeafPreimage {
    constructor(
    /**
     * The slot of the leaf
     */
    slot, 
    /**
     * The value of the leaf
     */
    value, 
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextSlot, 
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex) {
        this.slot = slot;
        this.value = value;
        this.nextSlot = nextSlot;
        this.nextIndex = nextIndex;
    }
    getKey() {
        return this.slot.toBigInt();
    }
    getNextKey() {
        return this.nextSlot.toBigInt();
    }
    getNextIndex() {
        return this.nextIndex;
    }
    asLeaf() {
        return new PublicDataTreeLeaf(this.slot, this.value);
    }
    toBuffer() {
        return Buffer.concat(this.toHashInputs());
    }
    toHashInputs() {
        return [
            Buffer.from(this.slot.toBuffer()),
            Buffer.from(this.value.toBuffer()),
            Buffer.from(toBufferBE(this.nextIndex, 32)),
            Buffer.from(this.nextSlot.toBuffer()),
        ];
    }
    clone() {
        return new PublicDataTreeLeafPreimage(this.slot, this.value, this.nextSlot, this.nextIndex);
    }
    static empty() {
        return new PublicDataTreeLeafPreimage(Fr.ZERO, Fr.ZERO, Fr.ZERO, 0n);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const slot = Fr.fromBuffer(reader);
        const value = Fr.fromBuffer(reader);
        const nextIndex = toBigIntBE(reader.readBytes(32));
        const nextSlot = Fr.fromBuffer(reader);
        return new PublicDataTreeLeafPreimage(slot, value, nextSlot, nextIndex);
    }
    static fromLeaf(leaf, nextKey, nextIndex) {
        return new PublicDataTreeLeafPreimage(leaf.slot, leaf.value, new Fr(nextKey), nextIndex);
    }
    static clone(preimage) {
        return new PublicDataTreeLeafPreimage(preimage.slot, preimage.value, preimage.nextSlot, preimage.nextIndex);
    }
}
/**
 * A leaf in the public data indexed tree.
 */
export class PublicDataTreeLeaf {
    constructor(
    /**
     * The slot the value is stored in
     */
    slot, 
    /**
     * The value stored in the slot
     */
    value) {
        this.slot = slot;
        this.value = value;
    }
    getKey() {
        return this.slot.toBigInt();
    }
    toBuffer() {
        return serializeToBuffer([this.slot, this.value]);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataTreeLeaf(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    equals(another) {
        return this.slot.equals(another.slot) && this.value.equals(another.value);
    }
    toString() {
        return `PublicDataTreeLeaf(${this.slot.toString()}, ${this.value.toString()})`;
    }
    isEmpty() {
        return this.slot.isZero() && this.value.isZero();
    }
    updateTo(another) {
        if (!this.slot.equals(another.slot)) {
            throw new Error('Invalid update: slots do not match');
        }
        return new PublicDataTreeLeaf(this.slot, another.value);
    }
    static buildDummy(key) {
        return new PublicDataTreeLeaf(new Fr(key), new Fr(0));
    }
    static empty() {
        return new PublicDataTreeLeaf(Fr.ZERO, Fr.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfbGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3RyZWVzL3B1YmxpY19kYXRhX2xlYWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlFOzs7R0FHRztBQUNILE1BQU0sT0FBTywwQkFBMEI7SUFDckM7SUFDRTs7T0FFRztJQUNJLElBQVE7SUFDZjs7T0FFRztJQUNJLEtBQVM7SUFDaEI7O09BRUc7SUFDSSxRQUFZO0lBQ25COztPQUVHO0lBQ0ksU0FBaUI7UUFaakIsU0FBSSxHQUFKLElBQUksQ0FBSTtRQUlSLFVBQUssR0FBTCxLQUFLLENBQUk7UUFJVCxhQUFRLEdBQVIsUUFBUSxDQUFJO1FBSVosY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUN2QixDQUFDO0lBRUosTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsWUFBWTtR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