import { toBigIntBE, toBufferBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * Class containing the data of a preimage of a single leaf in the nullifier tree.
 * Note: It's called preimage because this data gets hashed before being inserted as a node into the `IndexedTree`.
 */
export class NullifierLeafPreimage {
    constructor(
    /**
     * Leaf value inside the indexed tree's linked list.
     */
    nullifier, 
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextNullifier, 
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex) {
        this.nullifier = nullifier;
        this.nextNullifier = nextNullifier;
        this.nextIndex = nextIndex;
    }
    getKey() {
        return this.nullifier.toBigInt();
    }
    getNextKey() {
        return this.nextNullifier.toBigInt();
    }
    getNextIndex() {
        return this.nextIndex;
    }
    asLeaf() {
        return new NullifierLeaf(this.nullifier);
    }
    toBuffer() {
        return Buffer.concat(this.toHashInputs());
    }
    toHashInputs() {
        return [
            Buffer.from(this.nullifier.toBuffer()),
            Buffer.from(this.nextNullifier.toBuffer()),
            Buffer.from(toBufferBE(this.nextIndex, 32)),
        ];
    }
    toFields() {
        return this.toHashInputs().map(buf => Fr.fromBuffer(buf));
    }
    clone() {
        return new NullifierLeafPreimage(this.nullifier, this.nextNullifier, this.nextIndex);
    }
    toJSON() {
        return {
            nullifier: this.nullifier.toString(),
            nextNullifier: this.nextNullifier.toString(),
            nextIndex: '0x' + this.nextIndex.toString(16),
        };
    }
    static empty() {
        return new NullifierLeafPreimage(Fr.ZERO, Fr.ZERO, 0n);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new NullifierLeafPreimage(reader.readObject(Fr), reader.readObject(Fr), toBigIntBE(reader.readBytes(32)));
    }
    static fromLeaf(leaf, nextKey, nextIndex) {
        return new NullifierLeafPreimage(leaf.nullifier, new Fr(nextKey), nextIndex);
    }
    static clone(preimage) {
        return new NullifierLeafPreimage(preimage.nullifier, preimage.nextNullifier, preimage.nextIndex);
    }
    static fromJSON(json) {
        return new NullifierLeafPreimage(Fr.fromString(json.nullifier), Fr.fromString(json.nextNullifier), BigInt(json.nextIndex));
    }
}
/**
 * A nullifier to be inserted in the nullifier tree.
 */
export class NullifierLeaf {
    constructor(
    /**
     * Nullifier value.
     */
    nullifier) {
        this.nullifier = nullifier;
    }
    getKey() {
        return this.nullifier.toBigInt();
    }
    toBuffer() {
        return this.nullifier.toBuffer();
    }
    isEmpty() {
        return this.nullifier.isZero();
    }
    updateTo(_another) {
        throw new Error('Nullifiers are create only');
    }
    static buildDummy(key) {
        return new NullifierLeaf(new Fr(key));
    }
    static fromBuffer(buf) {
        return new NullifierLeaf(Fr.fromBuffer(buf));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbGlmaWVyX2xlYWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy90cmVlcy9udWxsaWZpZXJfbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHM0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQztJQUNFOztPQUVHO0lBQ0ksU0FBYTtJQUNwQjs7T0FFRztJQUNJLGFBQWlCO0lBQ3hCOztPQUVHO0lBQ0ksU0FBaUI7UUFSakIsY0FBUyxHQUFULFNBQVMsQ0FBSTtRQUliLGtCQUFhLEdBQWIsYUFBYSxDQUFJO1FBSWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFDdkIsQ0FBQztJQUVKLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU87WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsTUFBTSxD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