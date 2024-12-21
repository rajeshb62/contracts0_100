import { toBigIntBE } from '../bigint-buffer/index.js';
import { Fr } from './fields.js';
/**
 * Class to wrap a single point coordinate.
 * This class handles the complexities of representing point coordinates as 32 byte buffers as well as fields.
 * The coordinate value is split across 2 fields to ensure that the max size of a field is not breached.
 * This is achieved by placing the most significant byte of the lower field into the least significant byte of the higher field.
 * Calls to 'toBuffer' or 'toBigInt' undo this change and simply return the original 32 byte value.
 * Calls to 'toFieldsBuffer' will return a 64 bytes buffer containing the serialized fields.
 */
export class Coordinate {
    constructor(
    /**
     * The fields of the coordinate value. Least significant limb at index 0.
     */
    fields) {
        this.fields = fields;
    }
    /**
     * Converts the coordinate data into a tuple of fields
     * @returns A tuple of the coordinate fields
     */
    toFields() {
        return this.fields;
    }
    /**
     * Generates a random coordinate value
     * @returns The random coordinate
     */
    static random() {
        return this.fromField(Fr.random());
    }
    /**
     * serializes the object to buffer of 2 fields.
     * @returns A buffer serialization of the object.
     */
    toFieldsBuffer() {
        return Buffer.concat([this.fields[0].toBuffer(), this.fields[1].toBuffer()]);
    }
    /**
     * serializes the coordinate to a single 32 byte buffer.
     * @returns A buffer serialization of the object.
     */
    toBuffer() {
        const buf0 = this.fields[0].toBuffer();
        const buf1 = this.fields[1].toBuffer();
        buf0[0] = buf1[31];
        return buf0;
    }
    /**
     * Returns true if this coordinate is equal to the one provided
     * @param other - The coordinate against which to compare
     * @returns True if the coordinates are the same, false otherwise
     */
    equals(other) {
        return this.toBigInt() === other.toBigInt();
    }
    /**
     * Returns the coordinate's value as a bigint
     * @returns The coordinate value as a bigint
     */
    toBigInt() {
        return toBigIntBE(this.toBuffer());
    }
    /**
     * Creates a coordinate object from a 32 byte coordinate value
     * @param coordinate - A buffer containing the 32 byte coordinate value
     * @returns The new coordinate object
     */
    static fromBuffer(coordinate) {
        if (coordinate.length != 32) {
            throw new Error(`Invalid size of coordinate buffer`);
        }
        const buf0 = Buffer.alloc(32);
        coordinate.copy(buf0, 0, 0, 32);
        const buf1 = Buffer.alloc(32);
        buf1[31] = buf0[0];
        buf0[0] = 0;
        return new Coordinate([Fr.fromBuffer(buf0), Fr.fromBuffer(buf1)]);
    }
    /**
     * Creates a coordinate object from a field
     * @param coordinate - The field containing the coordinate
     * @returns The new coordinate object
     */
    static fromField(coordinate) {
        const buf0 = coordinate.toBuffer();
        const buf1 = Buffer.alloc(32);
        buf1[31] = buf0[0];
        buf0[0] = 0;
        return new Coordinate([Fr.fromBuffer(buf0), Fr.fromBuffer(buf1)]);
    }
}
Coordinate.ZERO = new Coordinate([Fr.ZERO, Fr.ZERO]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWVsZHMvY29vcmRpbmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVqQzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFHckI7SUFDRTs7T0FFRztJQUNJLE1BQW9CO1FBQXBCLFdBQU0sR0FBTixNQUFNLENBQWM7SUFDMUIsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxjQUFjO1FBQ1osT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsS0FBaUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQWtCO1FBQ2xDLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFjO1FBQzdCLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O0FBekZNLGVBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMifQ==