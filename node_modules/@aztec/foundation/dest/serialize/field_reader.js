import { Fq } from '../fields/fields.js';
/**
 * The FieldReader class provides a utility for reading various data types from a field array.
 *
 * Usage:
 * Create a new instance of FieldReader with an array of fields and an optional offset.
 * Use the provided methods to read desired data types from the field array.
 * The reading methods automatically advance the internal index.
 */
export class FieldReader {
    constructor(fields, offset = 0) {
        this.fields = fields;
        this.index = offset;
        this.length = fields.length;
        if (offset >= this.length) {
            throw new Error('Offset out of bounds.');
        }
    }
    /**
     * Creates a FieldReader instance from either a field array or an existing FieldReader.
     *
     * @param fields - A field array or FieldReader to initialize the FieldReader.
     * @returns An instance of FieldReader.
     */
    static asReader(fields) {
        if (fields instanceof FieldReader) {
            return fields;
        }
        return new FieldReader(fields);
    }
    /**
     * Reads a single field from the array.
     *
     * @returns A field.
     */
    readField() {
        if (this.index === this.length) {
            throw new Error('Not enough fields to be consumed.');
        }
        return this.fields[this.index++];
    }
    /**
     * Reads a Fq from the array.
     *
     * @returns An Fq.
     */
    readFq() {
        return Fq.fromHighLow(this.readField(), this.readField());
    }
    /**
     * Reads and returns the next boolean value from the field array.
     * Advances the internal index by 1, treating the field at the current index as a boolean value.
     * Returns true if the field is non-zero, false otherwise.
     * Throw if the value is not 0 or 1.
     *
     * @returns A boolean value representing the field at the current index.
     */
    readBoolean() {
        const field = this.readField();
        const value = field.toBigInt();
        if (value > 1n) {
            throw new Error('Field is not a boolean.');
        }
        return value == 1n;
    }
    /**
     * Reads a 32-bit unsigned integer from the field array at the current index position.
     * Updates the index position by 1 after reading the number.
     * Throw if the value is greater than 2 ** 32.
     *
     * @returns The read 32-bit unsigned integer value.
     */
    readU32() {
        const field = this.readField();
        const value = field.toBigInt();
        if (value >= 1n << 32n) {
            throw new Error('Field is not a u32.');
        }
        return Number(value);
    }
    /**
     * Read an array of a fixed size field array.
     *
     * @param size - The fixed number of fields in the array.
     * @returns An array of fields.
     */
    readFieldArray(size) {
        const result = [];
        for (let i = 0; i < size; ++i) {
            result.push(this.readField());
        }
        return result;
    }
    /**
     * Read an array of a fixed size with elements of type T from the field array.
     * The 'itemDeserializer' object should have a 'fromFields' method that takes a FieldReader instance as input,
     * and returns an instance of the desired deserialized data type T.
     * This method will call the 'fromFields' method for each element in the array and return the resulting array.
     *
     * @param size - The fixed number of elements in the array.
     * @param itemDeserializer - An object with a 'fromFields' method to deserialize individual elements of type T.
     * @returns An array of instances of type T.
     */
    readArray(size, itemDeserializer) {
        const result = Array.from({ length: size }, () => itemDeserializer.fromFields(this));
        return result;
    }
    /**
     * Reads a serialized object from a field array and returns the deserialized object using the given deserializer.
     *
     * @typeparam T - The type of the deserialized object.
     * @param deserializer - An object with a 'fromFields' method that takes a FieldReader instance and returns an instance of the deserialized object.
     * @returns The deserialized object of type T.
     */
    readObject(deserializer) {
        return deserializer.fromFields(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRfcmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZS9maWVsZF9yZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBVyxNQUFNLHFCQUFxQixDQUFDO0FBR2xEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sV0FBVztJQUd0QixZQUFvQixNQUFZLEVBQUUsTUFBTSxHQUFHLENBQUM7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBTTtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUEwQjtRQUMvQyxJQUFJLE1BQU0sWUFBWSxXQUFXLEVBQUUsQ0FBQztZQUNsQyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVM7UUFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxXQUFXO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNELE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksT0FBTztRQUNaLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksY0FBYyxDQUFtQixJQUFPO1FBQzdDLE1BQU0sTUFBTSxHQUFTLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsT0FBTyxNQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxTQUFTLENBQ2QsSUFBTyxFQUNQLGdCQUtDO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRixPQUFPLE1BQXFCLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLFVBQVUsQ0FBSSxZQUtwQjtRQUNDLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0YifQ==