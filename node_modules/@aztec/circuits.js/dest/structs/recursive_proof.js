import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { Proof, makeEmptyProof } from './proof.js';
/**
 * The Recursive proof class is a wrapper around the circuit's proof.
 * We store the proof in 2 forms for convenience. The first is in the 'fields' format.
 * This is a list of fields, for which there are distinct lengths based on the level of recursion.
 * This 'fields' version does not contain the circuits public inputs
 * We also store the raw binary proof which van be directly verified.
 *
 * The 'fieldsValid' member is set to false in the case where this object is constructed solely from the 'binary' proof
 * This is usually when the proof has been received from clients and signals to provers that the 'fields' version needs to be generated
 */
export class RecursiveProof {
    constructor(
    /**
     * Holds the serialized proof data in an array of fields, this is without the public inputs
     */
    proof, 
    /**
     * Holds the serialized proof data in a binary buffer, this contains the public inputs
     */
    binaryProof, 
    /**
     * This flag determines if the 'proof' member is valid, or if we need to generate it from the 'binaryProof' first
     */
    fieldsValid) {
        this.proof = proof;
        this.binaryProof = binaryProof;
        this.fieldsValid = fieldsValid;
    }
    /**
     * Create a Proof from a Buffer or BufferReader.
     * Expects a length-encoding.
     *
     * @param buffer - A Buffer or BufferReader containing the length-encoded proof data.
     * @returns A Proof instance containing the decoded proof data.
     */
    static fromBuffer(buffer, expectedSize) {
        const reader = BufferReader.asReader(buffer);
        const size = reader.readNumber();
        if (typeof expectedSize === 'number' && expectedSize !== size) {
            throw new Error(`Expected proof length ${expectedSize}, got ${size}`);
        }
        return new RecursiveProof(reader.readArray(size, Fr), Proof.fromBuffer(reader), reader.readBoolean());
    }
    /**
     * Convert the Proof instance to a custom Buffer format.
     * This function serializes the Proof's buffer length and data sequentially into a new Buffer.
     *
     * @returns A Buffer containing the serialized proof data in custom format.
     */
    toBuffer() {
        return serializeToBuffer(this.proof.length, this.proof, this.binaryProof, this.fieldsValid);
    }
    /**
     * Serialize the Proof instance to a hex string.
     * @returns The hex string representation of the proof data.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserialize a Proof instance from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns - A new Proof instance.
     */
    static fromString(str, expectedSize) {
        return RecursiveProof.fromBuffer(Buffer.from(str, 'hex'), expectedSize);
    }
}
/**
 * Makes an empty proof.
 * Note: Used for local devnet milestone where we are not proving anything yet.
 * @returns The empty "proof".
 */
export function makeEmptyRecursiveProof(size) {
    return new RecursiveProof(makeTuple(size, Fr.zero), makeEmptyProof(), true);
}
export function makeRecursiveProof(size, seed = 1) {
    return new RecursiveProof(makeTuple(size, (i) => new Fr(i), seed), makeEmptyProof(), true);
}
/**
 * Makes an instance of the recursive proof from a binary only proof
 * @returns The proof object
 */
export function makeRecursiveProofFromBinary(proof, size) {
    return new RecursiveProof(makeTuple(size, Fr.zero), proof, false);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlX3Byb29mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvcmVjdXJzaXZlX3Byb29mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFGLE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRW5EOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBQ3pCO0lBQ0U7O09BRUc7SUFDSSxLQUFtQjtJQUUxQjs7T0FFRztJQUNJLFdBQWtCO0lBQ3pCOztPQUVHO0lBQ0ksV0FBb0I7UUFUcEIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUtuQixnQkFBVyxHQUFYLFdBQVcsQ0FBTztRQUlsQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztJQUMxQixDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDZixNQUE2QixFQUM3QixZQUFnQjtRQUVoQixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsWUFBWSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUNELE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFRLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDZixHQUFXLEVBQ1gsWUFBZ0I7UUFFaEIsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQW1CLElBQU87SUFDL0QsT0FBTyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQVEsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUE4QixJQUFrQixFQUFFLElBQUksR0FBRyxDQUFDO0lBQzFGLE9BQU8sSUFBSSxjQUFjLENBQ3ZCLFNBQVMsQ0FBbUIsSUFBSSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFDakUsY0FBYyxFQUFFLEVBQ2hCLElBQUksQ0FDTCxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FBOEIsS0FBWSxFQUFFLElBQWtCO0lBQ3hHLE9BQU8sSUFBSSxjQUFjLENBQWUsU0FBUyxDQUFtQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNwRyxDQUFDIn0=