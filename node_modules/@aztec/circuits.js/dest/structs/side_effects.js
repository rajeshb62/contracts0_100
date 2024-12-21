import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Side-effect object consisting of a value and a counter.
 * cpp/src/aztec3/circuits/abis/side_effects.hpp.
 */
export class SideEffect {
    constructor(
    /**
     * The value of the side-effect object.
     */
    value, 
    /**
     * The side-effect counter.
     */
    counter) {
        this.value = value;
        this.counter = counter;
    }
    toString() {
        return `value=${this.value.toString()} counter=${this.counter.toString()}`;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.value, this.counter);
    }
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields() {
        return [this.value, this.counter];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new SideEffect(reader.readField(), reader.readField());
    }
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    isEmpty() {
        return SideEffect.isEmpty(this);
    }
    /**
     * Checks whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    static isEmpty(sideEffect) {
        return sideEffect.value.isZero() && sideEffect.counter.isZero();
    }
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with both value and counter being zero.
     */
    static empty() {
        return new SideEffect(Fr.zero(), Fr.zero());
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of SideEffect.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new SideEffect(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZV9lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvc2lkZV9lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBa0IzRjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sVUFBVTtJQUNyQjtJQUNFOztPQUVHO0lBQ0ksS0FBUztJQUNoQjs7T0FFRztJQUNJLE9BQVc7UUFKWCxVQUFLLEdBQUwsS0FBSyxDQUFJO1FBSVQsWUFBTyxHQUFQLE9BQU8sQ0FBSTtJQUNqQixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8sU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNMLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFzQjtRQUNuQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRiJ9