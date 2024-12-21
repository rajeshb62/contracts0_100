import { Fr } from '../fields/fields.js';
/**
 * Convert a boolean value to its corresponding byte representation in a Buffer of size 1.
 * The function takes a boolean value and writes it into a new buffer as either 1 (true) or 0 (false).
 * This method is useful for converting a boolean value into a binary format that can be stored or transmitted easily.
 *
 * @param b - The boolean value to be converted.
 * @returns A Buffer containing the byte representation of the input boolean value.
 */
export function boolToByte(b) {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(b ? 1 : 0);
    return buf;
}
/**
 * @param n - The input number to be converted to a big-endian unsigned 16-bit integer Buffer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 2).
 * @returns A Buffer containing the big-endian unsigned 16-bit integer representation of the input number.
 */
export function numToUInt16BE(n, bufferSize = 2) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt16BE(n, bufferSize - 2);
    return buf;
}
/**
 * Convert a number into a 4-byte little-endian unsigned integer buffer.
 * The input number is serialized as an unsigned 32-bit integer in little-endian byte order,
 * and returned as a Buffer of specified size (defaults to 4).
 * If the provided bufferSize is greater than 4, the additional bytes will be padded with zeros.
 *
 * @param n - The number to be converted into a little-endian unsigned integer buffer.
 * @param bufferSize - Optional, the size of the output buffer (default value is 4).
 * @returns A Buffer containing the serialized little-endian unsigned integer representation of the input number.
 */
export function numToUInt32LE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32LE(n, bufferSize - 4);
    return buf;
}
/**
 * Convert a number to a big-endian unsigned 32-bit integer Buffer.
 * This function takes a number and an optional buffer size as input and creates a Buffer with the specified size (defaults to 4) containing the big-endian representation of the input number as an unsigned 32-bit integer. Note that the bufferSize should be greater than or equal to 4, otherwise the output Buffer might truncate the serialized value.
 *
 * @param n - The input number to be converted to a big-endian unsigned 32-bit integer Buffer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 4).
 * @returns A Buffer containing the big-endian unsigned 32-bit integer representation of the input number.
 */
export function numToUInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32BE(n, bufferSize - 4);
    return buf;
}
/**
 * Serialize a number into a big-endian signed 32-bit integer Buffer with the specified buffer size.
 * This function converts the input number into its binary representation and stores it in a Buffer
 * with the provided buffer size. By default, the buffer size is set to 4 bytes which represents a 32-bit integer.
 * The function will use the last 4 bytes of the buffer to store the serialized number. If the input number
 * is outside the range of a 32-bit signed integer, the resulting serialization may be incorrect due to truncation.
 *
 * @param n - The number to be serialized as a signed 32-bit integer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 4 bytes).
 * @returns A Buffer containing the serialized big-endian signed 32-bit integer.
 */
export function numToInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeInt32BE(n, bufferSize - 4);
    return buf;
}
/**
 * Convert a number to an 8-bit unsigned integer and return it as a Buffer of length 1.
 * The input number is written as an 8-bit unsigned integer into the buffer. This function
 * is useful for converting small numeric values to a standardized binary format that can be
 * easily stored or transmitted.
 *
 * @param n - The number to be converted to an 8-bit unsigned integer.
 * @returns A Buffer containing the 8-bit unsigned integer representation of the input number.
 */
export function numToUInt8(n) {
    const bufferSize = 1;
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt8(n, 0);
    return buf;
}
/**
 * Adds a 4-byte byte-length prefix to a buffer.
 * @param buf - The input Buffer to be prefixed
 * @returns A Buffer with 4-byte byte-length prefix.
 */
export function prefixBufferWithLength(buf) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(buf.length, 0);
    return Buffer.concat([lengthBuf, buf]);
}
/**
 * Parse a buffer as a big integer.
 */
export function toBigInt(buf) {
    const hex = buf.toString('hex');
    if (hex.length === 0) {
        return BigInt(0);
    }
    return BigInt(`0x${hex}`);
}
/**
 * Stores full 256 bits of information in 2 fields.
 * @param buf - 32 bytes of data
 * @returns 2 field elements
 */
export function to2Fields(buf) {
    if (buf.length !== 32) {
        throw new Error('Buffer must be 32 bytes');
    }
    // Split the hash into two fields, a high and a low
    const buf1 = Buffer.concat([Buffer.alloc(16), buf.subarray(0, 16)]);
    const buf2 = Buffer.concat([Buffer.alloc(16), buf.subarray(16, 32)]);
    return [Fr.fromBuffer(buf1), Fr.fromBuffer(buf2)];
}
/**
 * Reconstructs the original 32 bytes of data from 2 field elements.
 * @param field1 - First field element
 * @param field2 - Second field element
 * @returns 32 bytes of data as a Buffer
 */
export function from2Fields(field1, field2) {
    // Convert the field elements back to buffers
    const buf1 = field1.toBuffer();
    const buf2 = field2.toBuffer();
    // Remove the padding (first 16 bytes) from each buffer
    const originalPart1 = buf1.subarray(Fr.SIZE_IN_BYTES / 2, Fr.SIZE_IN_BYTES);
    const originalPart2 = buf2.subarray(Fr.SIZE_IN_BYTES / 2, Fr.SIZE_IN_BYTES);
    // Concatenate the two parts to form the original buffer
    return Buffer.concat([originalPart1, originalPart2]);
}
/**
 * Truncates SHA hashes to match Noir's truncated version
 * @param buf - 32 bytes of data
 * @returns 31 bytes of data padded to 32
 */
export function truncateAndPad(buf) {
    // Note that we always truncate here, to match solidity's sha256ToField()
    if (buf.length !== 32) {
        throw new Error('Buffer to truncate must be 32 bytes');
    }
    return Buffer.concat([Buffer.alloc(1), buf.subarray(0, 31)]);
}
/**
 * Stores 248 bits of information in 1 field.
 * @param buf - 32 or 31 bytes of data
 * @returns 1 field element
 */
export function toTruncField(buf) {
    if (buf.length !== 32 && buf.length !== 31) {
        throw new Error('Buffer must be 31 or 32 bytes');
    }
    if ((buf.length == 32 && buf[0] == 0) || buf.length == 31) {
        return Fr.fromBuffer(buf);
    }
    else {
        // Note: safer to NOT truncate here, all inputs are expected to be truncated
        // from Noir or L1 Contracts or Class.hash() methods
        throw new Error(`Number ${toBigInt(buf)} does not fit in 31 byte truncated buffer`);
    }
}
/**
 * Reconstructs the original 31 bytes of data from 1 truncated field element.
 * @param field - field element
 * @returns 31 bytes of data as a Buffer
 */
export function fromTruncField(field) {
    const buffer = field.toBuffer();
    if (buffer[0] != 0) {
        throw new Error(`Number ${field} does not fit in 31 byte truncated buffer`);
    }
    return buffer;
}
export function fromFieldsTuple(fields) {
    return from2Fields(fields[0], fields[1]);
}
export function toHumanReadable(buf, maxLen) {
    const result = buf.every(byte => byte >= 32 && byte <= 126) ? buf.toString('ascii') : `0x${buf.toString('hex')}`;
    if (maxLen && result.length > maxLen) {
        return result.slice(0, maxLen) + '...';
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZV9mdW5jcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvZnJlZV9mdW5jcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHekM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBVTtJQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLENBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLENBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxDQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDckQsTUFBTSxHQUFHLEdBQUcsTUFBTSxD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