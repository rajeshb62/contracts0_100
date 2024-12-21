import { randomBytes } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, mapTuple } from '@aztec/foundation/serialize';
/**
 * Schnorr signature used for transactions.
 * @see cpp/barretenberg/cpp/src/barretenberg/crypto/schnorr/schnorr.hpp
 */
export class SchnorrSignature {
    constructor(buffer) {
        this.buffer = buffer;
        if (buffer.length !== SchnorrSignature.SIZE) {
            throw new Error(`Invalid signature buffer of length ${buffer.length}.`);
        }
    }
    /**
     * Determines if the provided signature is valid or not.
     * @param signature - The data to be checked.
     * @returns Boolean indicating if the provided data is a valid schnorr signature.
     */
    static isSignature(signature) {
        return /^(0x)?[0-9a-f]{128}$/i.test(signature);
    }
    /**
     * Constructs a SchnorrSignature from the provided string.
     * @param signature - The string to be converted to a schnorr signature.
     * @returns The constructed schnorr signature.
     */
    static fromString(signature) {
        if (!SchnorrSignature.isSignature(signature)) {
            throw new Error(`Invalid signature string: ${signature}`);
        }
        return new SchnorrSignature(Buffer.from(signature.replace(/^0x/i, ''), 'hex'));
    }
    /**
     * Generates a random schnorr signature.
     * @returns The randomly constructed signature.
     */
    static random() {
        return new SchnorrSignature(randomBytes(64));
    }
    /**
     * Returns the 's' component of the signature.
     * @returns A buffer containing the signature's 's' component.
     */
    get s() {
        return this.buffer.subarray(0, 32);
    }
    /**
     * Returns the 'e' component of the signature.
     * @returns A buffer containing the signature's 'e' component.
     */
    get e() {
        return this.buffer.subarray(32);
    }
    /**
     * Returns the full signature as a buffer.
     * @returns A buffer containing the signature.
     */
    toBuffer() {
        return this.buffer;
    }
    /**
     * Deserializes from a buffer.
     * @param buffer - The buffer representation of the object.
     * @returns The new object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new SchnorrSignature(reader.readBytes(SchnorrSignature.SIZE));
    }
    /**
     * Returns the full signature as a hex string.
     * @returns A string containing the signature in hex format.
     */
    toString() {
        return `0x${this.buffer.toString('hex')}`;
    }
    /**
     * Converts the signature to an array of three fields.
     * @returns The signature components as an array of three fields
     */
    toFields() {
        const sig = this.toBuffer();
        const buf1 = Buffer.alloc(32);
        const buf2 = Buffer.alloc(32);
        const buf3 = Buffer.alloc(32);
        sig.copy(buf1, 1, 0, 31);
        sig.copy(buf2, 1, 31, 62);
        sig.copy(buf3, 1, 62, 64);
        return mapTuple([buf1, buf2, buf3], Fr.fromBuffer);
    }
}
/**
 * The size of the signature in bytes.
 */
SchnorrSignature.SIZE = 64;
/**
 * An empty signature.
 */
SchnorrSignature.EMPTY = new SchnorrSignature(Buffer.alloc(64));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2JhcnJldGVuYmVyZy9jcnlwdG8vc2Nobm9yci9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXJFOzs7R0FHRztBQUNILE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBaUI7UUFDekMsT0FBTyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQWlCO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNsQixPQUFPLElBQUksZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxQixPQUFPLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7O0FBdkdEOztHQUVHO0FBQ1cscUJBQUksR0FBRyxFQUFFLENBQUM7QUFFeEI7O0dBRUc7QUFDVyxzQkFBSyxHQUFHLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDIn0=