import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { MAX_BLOCK_NUMBER_LENGTH } from '../constants.gen.js';
/**
 * Maximum block number.
 */
export class MaxBlockNumber {
    constructor(
    /**
     * Whether a max block number was requested.
     */
    isSome, 
    /**
     * The requested max block number, if isSome is true.
     */
    value) {
        this.isSome = isSome;
        this.value = value;
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...MaxBlockNumber.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...MaxBlockNumber.getFields(this));
        if (fields.length !== MAX_BLOCK_NUMBER_LENGTH) {
            throw new Error(`Invalid number of fields for MaxBlockNumber. Expected ${MAX_BLOCK_NUMBER_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes MaxBlockNumber from a buffer or reader.
     * @param buffer - Buffer to read from.
     * @returns The MaxBlockNumber.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new MaxBlockNumber(reader.readBoolean(), Fr.fromBuffer(reader));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new MaxBlockNumber(reader.readBoolean(), reader.readField());
    }
    static empty() {
        return new MaxBlockNumber(false, Fr.ZERO);
    }
    isEmpty() {
        return !this.isSome && this.value.isZero();
    }
    /**
     * Create a new instance from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A new instance.
     */
    static from(fields) {
        return new MaxBlockNumber(...MaxBlockNumber.getFields(fields));
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [fields.isSome, fields.value];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4X2Jsb2NrX251bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL21heF9ibG9ja19udW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFOUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6QjtJQUNFOztPQUVHO0lBQ0ksTUFBZTtJQUN0Qjs7T0FFRztJQUNJLEtBQVM7UUFKVCxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBSWYsVUFBSyxHQUFMLEtBQUssQ0FBSTtJQUNmLENBQUM7SUFFSjs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyx1QkFBdUIsRUFBRSxDQUFDO1lBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ2IseURBQXlELHVCQUF1QixTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FDekcsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFnQztRQUMxQyxPQUFPLElBQUksY0FBYyxDQUFDLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFnQztRQUMvQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFVLENBQUM7SUFDaEQsQ0FBQztDQUNGIn0=