// TODO find a new home for this as we move to external bb.js
// See https://github.com/AztecProtocol/aztec-packages/issues/782
import { Buffer } from 'buffer';
/**
 * For serializing an array of fixed length buffers.
 * TODO move to foundation pkg.
 * @param arr - Array of bufffers.
 * @returns The serialized buffers.
 */
export function serializeBufferArrayToVector(arr) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(arr.length, 0);
    return Buffer.concat([lengthBuf, ...arr]);
}
/**
 * For deserializing numbers to 32-bit little-endian form.
 * TODO move to foundation pkg.
 * @param n - The number.
 * @returns The endian-corrected number.
 */
export function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = vector.readUInt32BE(pos);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
/**
 * For serializing numbers to 32 bit little-endian form.
 * TODO move to foundation pkg.
 * @param n - The number.
 * @returns The endian-corrected number.
 */
export function numToUInt32LE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32LE(n, bufferSize - 4);
    return buf;
}
/**
 * Deserialize the 256-bit number at address `offset`.
 * @param buf - The buffer.
 * @param offset - The address.
 * @returns The derserialized 256-bit field.
 */
export function deserializeField(buf, offset = 0) {
    const adv = 32;
    return { elem: buf.slice(offset, offset + adv), adv };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JhcnJldGVuYmVyZy9zZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELGlFQUFpRTtBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUFDLEdBQWE7SUFDeEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBbUJEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFJLFdBQTZCLEVBQUUsTUFBYyxFQUFFLE1BQU0sR0FBRyxDQUFDO0lBQ3JHLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBSSxJQUFJLENBQUMsQ0FBQztJQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsQ0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxNQUFNLEdBQUcsQ0FBQztJQUN0RCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUN4RCxDQUFDIn0=