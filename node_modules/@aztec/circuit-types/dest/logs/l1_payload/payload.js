import { Vector } from '@aztec/circuits.js';
import { randomInt } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * The Note class represents a Note emitted from a Noir contract as a vector of Fr (finite field) elements.
 * This data also represents a preimage to a note hash. This class extends the Vector class, which allows for
 * additional operations on the underlying field elements.
 */
export class Payload extends Vector {
    /**
     * Create a Note instance from a Buffer or BufferReader.
     * The input 'buffer' can be either a Buffer containing the serialized Fr elements or a BufferReader instance.
     * This function reads the Fr elements in the buffer and constructs a Note with them.
     *
     * @param buffer - The Buffer or BufferReader containing the serialized Fr elements.
     * @returns A Note instance containing the deserialized Fr elements.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new Payload(reader.readVector(Fr));
    }
    /**
     * Generates a random Note instance with a variable number of items.
     * The number of items is determined by a random value between 1 and 10 (inclusive).
     * Each item in the Note is generated using the Fr.random() method.
     *
     * @returns A randomly generated Note instance.
     */
    static random() {
        const numItems = randomInt(10) + 1;
        const items = Array.from({ length: numItems }, () => Fr.random());
        return new Payload(items);
    }
    /**
     * Returns a hex representation of the note.
     * @returns A hex string with the vector length as first element.
     */
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    /**
     * Creates a new Note instance from a hex string.
     * @param str - Hex representation.
     * @returns A Note instance.
     */
    static fromString(str) {
        const hex = str.replace(/^0x/, '');
        return Payload.fromBuffer(Buffer.from(hex, 'hex'));
    }
    get length() {
        return this.items.length;
    }
    equals(other) {
        return this.items.every((item, index) => item.equals(other.items[index]));
    }
}
export class Event extends Payload {
}
export class Note extends Payload {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dzL2wxX3BheWxvYWQvcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0Q7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxPQUFRLFNBQVEsTUFBVTtJQUNyQzs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsTUFBTTtRQUNYLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDTSxRQUFRO1FBQ2YsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLEtBQU0sU0FBUSxPQUFPO0NBQUc7QUFFckMsTUFBTSxPQUFPLElBQUssU0FBUSxPQUFPO0NBQUcifQ==