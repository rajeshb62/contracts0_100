import chunk from 'lodash.chunk';
import { Fr } from '../fields/fields.js';
/**
 * Formats a buffer as an array of fields. Splits the input into 31-byte chunks, and stores each
 * of them into a field, omitting the field's first byte, then adds zero-fields at the end until the max length.
 * @param input - Input to format.
 * @param targetLength - Length of the target array in number of fields.
 * @returns A field with the total length in bytes, followed by an array of fields such that their concatenation is equal to the input buffer, followed by enough zeroes to reach targetLength.
 */
export function bufferAsFields(input, targetLength) {
    const encoded = [
        new Fr(input.length),
        ...chunk(input, Fr.SIZE_IN_BYTES - 1).map(c => {
            const fieldBytes = Buffer.alloc(Fr.SIZE_IN_BYTES);
            Buffer.from(c).copy(fieldBytes, 1);
            return Fr.fromBuffer(fieldBytes);
        }),
    ];
    if (encoded.length > targetLength) {
        throw new Error(`Input buffer exceeds maximum size: got ${encoded.length} but max is ${targetLength}`);
    }
    // Fun fact: we cannot use padArrayEnd here since typescript cannot deal with a Tuple this big
    return [...encoded, ...Array(targetLength - encoded.length).fill(Fr.ZERO)];
}
/**
 * Recovers a buffer from an array of fields.
 * @param fields - An output from bufferAsFields.
 * @returns The recovered buffer.
 */
export function bufferFromFields(fields) {
    const [length, ...payload] = fields;
    return Buffer.concat(payload.map(f => f.toBuffer().subarray(1))).subarray(0, length.toNumber());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FiaS9idWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV6Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQWEsRUFBRSxZQUFvQjtJQUNoRSxNQUFNLE9BQU8sR0FBRztRQUNkLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDcEIsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO0tBQ0gsQ0FBQztJQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxPQUFPLENBQUMsTUFBTSxlQUFlLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUNELDhGQUE4RjtJQUM5RixPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBWTtJQUMzQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNsRyxDQUFDIn0=