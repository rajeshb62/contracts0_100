import { STRING_ENCODING } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Write operations on the public state tree.
 */
export class PublicDataWrite {
    constructor(
    /**
     * Index of the updated leaf.
     */
    leafIndex, 
    /**
     * New value of the leaf.
     */
    newValue) {
        this.leafIndex = leafIndex;
        this.newValue = newValue;
    }
    /**
     * Creates a new public data write operation from the given arguments.
     * @param args - Arguments containing info used to create a new public data write operation.
     * @returns A new public data write operation instance.
     */
    static from(args) {
        return new PublicDataWrite(args.leafIndex, args.newValue);
    }
    /**
     * Serializes the public data write operation to a buffer.
     * @returns A buffer containing the serialized public data write operation.
     */
    toBuffer() {
        return serializeToBuffer(this.leafIndex, this.newValue);
    }
    /**
     * Serializes the operation to a string.
     * @returns A string representation of the operation.
     */
    toString() {
        return this.toBuffer().toString(STRING_ENCODING);
    }
    /**
     * Checks if the public data write operation is empty.
     * @returns True if the public data write operation is empty, false otherwise.
     */
    isEmpty() {
        return this.leafIndex.isZero() && this.newValue.isZero();
    }
    /**
     * Creates a new public data write operation from the given buffer.
     * @param buffer - Buffer containing the serialized public data write operation.
     * @returns A new public data write operation instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataWrite(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    /**
     * Creates a new public data write operation from the given string.
     * @param str - The serialized string
     * @returns A new public data write operation instance.
     */
    static fromString(str) {
        return PublicDataWrite.fromBuffer(Buffer.from(str, STRING_ENCODING));
    }
    /**
     * Creates an empty public data write operation.
     * @returns A new public data write operation instance.
     */
    static empty() {
        return new PublicDataWrite(Fr.ZERO, Fr.ZERO);
    }
    /**
     * Creates a random public data write operation.
     * @returns A new public data write operation instance.
     */
    static random() {
        return new PublicDataWrite(Fr.random(), Fr.random());
    }
    static isEmpty(data) {
        return data.isEmpty();
    }
}
PublicDataWrite.SIZE_IN_BYTES = Fr.SIZE_IN_BYTES * 2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfd3JpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHVibGljX2RhdGFfd3JpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQUcxQjtJQUNFOztPQUVHO0lBQ2EsU0FBYTtJQUM3Qjs7T0FFRztJQUNhLFFBQVk7UUFKWixjQUFTLEdBQVQsU0FBUyxDQUFJO1FBSWIsYUFBUSxHQUFSLFFBQVEsQ0FBSTtJQUMzQixDQUFDO0lBRUo7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFTWDtRQUNDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsTUFBTTtRQUNYLE9BQU8sSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXFCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7O0FBNUZNLDZCQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMifQ==