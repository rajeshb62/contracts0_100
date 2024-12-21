import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { assertLength, deserializeArrayFromVector, serializeArrayOfBufferableToVector, } from '@aztec/foundation/serialize';
/**
 * Contains functionality to compute and serialize/deserialize a sibling path.
 * E.g. Sibling path for a leaf at index 3 in a tree of depth 3 consists of:
 *      d0:                                            [ root ]
 *      d1:                      [ ]                                               [*]
 *      d2:         [*]                      [ ]                       [ ]                     [ ]
 *      d3:   [ ]         [ ]          [*]         [ ]           [ ]         [ ]          [ ]        [ ].
 *
 *      And the elements would be ordered as: [ leaf_at_index_2, node_at_level_2_index_0, node_at_level_1_index_1 ].
 */
export class SiblingPath {
    /**
     * Returns sibling path hashed up from the a element.
     * @param size - The number of elements in a given path.
     * @param zeroElement - Value of the zero element.
     * @param hasher - Implementation of a hasher interface.
     * @returns A sibling path hashed up from a zero element.
     */
    static ZERO(size, zeroElement, hasher) {
        const bufs = [];
        let current = zeroElement;
        for (let i = 0; i < size; ++i) {
            bufs.push(current);
            current = hasher.hash(current, current);
        }
        return new SiblingPath(size, bufs);
    }
    /**
     * Constructor.
     * @param pathSize - The size of the sibling path.
     * @param path - The sibling path data.
     */
    constructor(
    /**
     * Size of the sibling path (number of fields it contains).
     */
    pathSize, 
    /**
     * The sibling path data.
     */
    path) {
        this.pathSize = pathSize;
        this.data = assertLength(path, pathSize);
    }
    /**
     * Serializes this SiblingPath object to a buffer.
     * @returns The buffer representation of this object.
     */
    toBuffer() {
        return serializeArrayOfBufferableToVector(this.data);
    }
    /**
     * Returns the path buffer underlying the sibling path.
     * @returns The Buffer array representation of this object.
     */
    toBufferArray() {
        return this.data;
    }
    /**
     * Convert the Sibling Path object into an array of field elements.
     * @returns The field array representation of this object.
     */
    toFields() {
        return this.data.map(buf => Fr.fromBuffer(buf));
    }
    /**
     * Convert Sibling Path object into a tuple of field elements.
     * @returns A tuple representation of the sibling path.
     */
    toTuple() {
        const array = this.toFields();
        return makeTuple(array.length, i => array[i], 0);
    }
    /**
     * Deserializes a SiblingPath from a buffer.
     * @param buf - A buffer containing the buffer representation of SiblingPath.
     * @param offset - An offset to start deserializing from.
     * @returns A SiblingPath object.
     */
    static fromBuffer(buf, offset = 0) {
        const { elem } = SiblingPath.deserialize(buf, offset);
        return elem;
    }
    /**
     * Deserializes a SiblingPath object from a slice of a part of a buffer and returns the amount of bytes advanced.
     * @param buf - A buffer representation of the sibling path.
     * @param offset - An offset to start deserializing from.
     * @returns The deserialized sibling path and the number of bytes advanced.
     */
    static deserialize(buf, offset = 0) {
        const deserializePath = (buf, offset) => ({
            elem: buf.slice(offset, offset + 32),
            adv: 32,
        });
        const { elem, adv } = deserializeArrayFromVector(deserializePath, buf, offset);
        const size = elem.length;
        return { elem: new SiblingPath(size, elem), adv };
    }
    /**
     * Serializes this SiblingPath object to a hex string representation.
     * @returns A hex string representation of the sibling path.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes a SiblingPath object from a hex string representation.
     * @param repr - A hex string representation of the sibling path.
     * @returns A SiblingPath object.
     */
    static fromString(repr) {
        return SiblingPath.fromBuffer(Buffer.from(repr, 'hex'));
    }
    /**
     * Generate a subtree path from the current sibling path.
     * @param subtreeHeight - The size of the subtree that we are getting the path for.
     * @returns A new sibling path that is the for the requested subtree.
     */
    getSubtreeSiblingPath(subtreeHeight) {
        // Drop the size of the subtree from the path, and return the rest.
        const subtreeData = this.data.slice(subtreeHeight);
        const subtreePathSize = (this.pathSize - subtreeHeight);
        return new SiblingPath(subtreePathSize, subtreeData);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2libGluZ19wYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NpYmxpbmdfcGF0aC9zaWJsaW5nX3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBRUwsWUFBWSxFQUNaLDBCQUEwQixFQUMxQixrQ0FBa0MsR0FDbkMsTUFBTSw2QkFBNkIsQ0FBQztBQUdyQzs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sV0FBVztJQUd0Qjs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFtQixJQUFPLEVBQUUsV0FBbUIsRUFBRSxNQUFjO1FBQy9FLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNIO0lBQ0U7O09BRUc7SUFDSSxRQUFXO0lBQ2xCOztPQUVHO0lBQ0gsSUFBYztRQUpQLGFBQVEsR0FBUixRQUFRLENBQUc7UUFNbEIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxrQ0FBa0Ms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