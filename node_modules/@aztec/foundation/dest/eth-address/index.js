import { inspect } from 'util';
import { keccak256String } from '../crypto/keccak/index.js';
import { randomBytes } from '../crypto/random/index.js';
import { Fr } from '../fields/index.js';
import { BufferReader, FieldReader } from '../serialize/index.js';
import { TypeRegistry } from '../serialize/type_registry.js';
/**
 * Represents an Ethereum address as a 20-byte buffer and provides various utility methods
 * for converting between different representations, generating random addresses, validating
 * checksums, and comparing addresses. EthAddress can be instantiated using a buffer or string,
 * and can be serialized/deserialized from a buffer or BufferReader.
 */
export class EthAddress {
    constructor(buffer) {
        this.buffer = buffer;
        if (buffer.length !== EthAddress.SIZE_IN_BYTES) {
            throw new Error(`Expect buffer size to be ${EthAddress.SIZE_IN_BYTES}. Got ${buffer.length}.`);
        }
    }
    /**
     * Creates an EthAddress instance from a valid Ethereum address string.
     * The input 'address' can be either in checksum format or lowercase, and it can be prefixed with '0x'.
     * Throws an error if the input is not a valid Ethereum address.
     *
     * @param address - The string representing the Ethereum address.
     * @returns An EthAddress instance.
     */
    static fromString(address) {
        if (!EthAddress.isAddress(address)) {
            throw new Error(`Invalid address string: ${address}`);
        }
        return new EthAddress(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    /**
     * Create a random EthAddress instance with 20 random bytes.
     * This method generates a new Ethereum address with a randomly generated set of 20 bytes.
     * It is useful for generating test addresses or unique identifiers.
     *
     * @returns A randomly generated EthAddress instance.
     */
    static random() {
        return new EthAddress(randomBytes(20));
    }
    /**
     * Determines if the given string represents a valid Ethereum address.
     * A valid address should meet the following criteria:
     * 1. Contains exactly 40 hex characters (excluding an optional '0x' prefix).
     * 2. Is either all lowercase, all uppercase, or has a valid checksum based on EIP-55.
     *
     * @param address - The string to be checked for validity as an Ethereum address.
     * @returns True if the input string represents a valid Ethereum address, false otherwise.
     */
    static isAddress(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // Does not have the basic requirements of an address.
            return false;
        }
        else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
            // It's ALL lowercase or ALL uppercase.
            return true;
        }
        else {
            return EthAddress.checkAddressChecksum(address);
        }
    }
    /**
     * Checks if the EthAddress instance represents a zero address.
     * A zero address consists of 20 bytes filled with zeros and is considered an invalid address.
     *
     * @returns A boolean indicating whether the EthAddress instance is a zero address or not.
     */
    isZero() {
        return this.equals(EthAddress.ZERO);
    }
    /**
     * Checks if the given Ethereum address has a valid checksum.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 40 hex characters.
     * Returns true if the address has a valid checksum, false otherwise.
     *
     * @param address - The hex-encoded string representing the Ethereum address.
     * @returns A boolean value indicating whether the address has a valid checksum.
     */
    static checkAddressChecksum(address) {
        address = address.replace(/^0x/i, '');
        const addressHash = keccak256String(address.toLowerCase());
        for (let i = 0; i < 40; i++) {
            // The nth letter should be uppercase if the nth digit of casemap is 1.
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
                (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Converts an Ethereum address to its checksum format.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 40 hex characters.
     * The checksum format is created by capitalizing certain characters in the hex string
     * based on the hash of the lowercase address.
     * Throws an error if the input address is invalid.
     *
     * @param address - The Ethereum address as a hex-encoded string.
     * @returns The Ethereum address in its checksum format.
     */
    static toChecksumAddress(address) {
        if (!EthAddress.isAddress(address)) {
            throw new Error('Invalid address string.');
        }
        address = address.toLowerCase().replace(/^0x/i, '');
        const addressHash = keccak256String(address);
        let checksumAddress = '0x';
        for (let i = 0; i < address.length; i++) {
            // If ith character is 9 to f then make it uppercase.
            if (parseInt(addressHash[i], 16) > 7) {
                checksumAddress += address[i].toUpperCase();
            }
            else {
                checksumAddress += address[i];
            }
        }
        return checksumAddress;
    }
    /**
     * Checks whether the given EthAddress instance is equal to the current instance.
     * Equality is determined by comparing the underlying byte buffers of both instances.
     *
     * @param rhs - The EthAddress instance to compare with the current instance.
     * @returns A boolean value indicating whether the two instances are equal (true) or not (false).
     */
    equals(rhs) {
        return this.buffer.equals(rhs.buffer);
    }
    /**
     * Converts the Ethereum address to a hex-encoded string.
     * The resulting string is prefixed with '0x' and has exactly 40 hex characters.
     * This method can be used to represent the EthAddress instance in the widely used hexadecimal format.
     *
     * @returns A hex-encoded string representation of the Ethereum address.
     */
    toString() {
        return `0x${this.buffer.toString('hex')}`;
    }
    [inspect.custom]() {
        return `EthAddress<${this.toString()}>`;
    }
    /**
     * Returns the Ethereum address as a checksummed string.
     * The output string will have characters in the correct upper or lowercase form, according to EIP-55.
     * This provides a way to verify if an address is typed correctly, by checking the character casing.
     *
     * @returns A checksummed Ethereum address string.
     */
    toChecksumString() {
        return EthAddress.toChecksumAddress(this.buffer.toString('hex'));
    }
    /**
     * Returns a 20-byte buffer representation of the Ethereum address.
     * @returns A 20-byte Buffer containing the Ethereum address.
     */
    toBuffer() {
        return this.buffer;
    }
    /**
     * Returns a 32-byte buffer representation of the Ethereum address, with the original 20-byte address
     * occupying the last 20 bytes and the first 12 bytes being zero-filled.
     * This format is commonly used in smart contracts when handling addresses as 32-byte values.
     *
     * @returns A 32-byte Buffer containing the padded Ethereum address.
     */
    toBuffer32() {
        const buffer = Buffer.alloc(32);
        this.buffer.copy(buffer, 12);
        return buffer;
    }
    /**
     * Returns a new field with the same contents as this EthAddress.
     *
     * @returns An Fr instance.
     */
    toField() {
        return Fr.fromBuffer(this.toBuffer32());
    }
    /**
     * Converts a field to a eth address.
     * @param fr - The field to convert.
     * @returns The eth address.
     */
    static fromField(fr) {
        return new EthAddress(fr.toBuffer().slice(-EthAddress.SIZE_IN_BYTES));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return EthAddress.fromField(reader.readField());
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The EthAddress.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new EthAddress(reader.readBytes(EthAddress.SIZE_IN_BYTES));
    }
    /**
     * Friendly representation for debugging purposes.
     * @returns A hex string representing the address.
     */
    toFriendlyJSON() {
        return this.toString();
    }
    toJSON() {
        return {
            type: 'EthAddress',
            value: this.toString(),
        };
    }
}
/**
 * The size of an Ethereum address in bytes.
 */
EthAddress.SIZE_IN_BYTES = 20;
/**
 * Represents a zero Ethereum address with 20 bytes filled with zeros.
 */
EthAddress.ZERO = new EthAddress(Buffer.alloc(EthAddress.SIZE_IN_BYTES));
// For deserializing JSON.
TypeRegistry.register('EthAddress', EthAddress);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXRoLWFkZHJlc3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU3RDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBVXJCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsVUFBVSxDQUFDLGFBQWEsU0FBUyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqRyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWU7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RSxD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