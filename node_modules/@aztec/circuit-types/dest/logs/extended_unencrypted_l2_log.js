import { BufferReader } from '@aztec/foundation/serialize';
import isEqual from 'lodash.isequal';
import { LogId } from './log_id.js';
import { UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Represents an individual unencrypted log entry extended with info about the block and tx it was emitted in.
 */
export class ExtendedUnencryptedL2Log {
    constructor(
    /** Globally unique id of the log. */
    id, 
    /** The data contents of the log. */
    log) {
        this.id = id;
        this.log = log;
    }
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer() {
        return Buffer.concat([this.id.toBuffer(), this.log.toBuffer()]);
    }
    /**
     * Serializes log to a string.
     * @returns A string containing the serialized log.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Serializes log to a human readable string.
     * @returns A human readable representation of the log.
     */
    toHumanReadable() {
        return `${this.id.toHumanReadable()}, ${this.log.toHumanReadable()}`;
    }
    /**
     * Checks if two ExtendedUnencryptedL2Log objects are equal.
     * @param other - Another ExtendedUnencryptedL2Log object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other) {
        return isEqual(this, other);
    }
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer or buffer reader containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const logId = LogId.fromBuffer(reader);
        const log = UnencryptedL2Log.fromBuffer(reader);
        return new ExtendedUnencryptedL2Log(logId, log);
    }
    /**
     * Deserializes `ExtendedUnencryptedL2Log` object from a hex string representation.
     * @param data - A hex string representation of the log.
     * @returns An `ExtendedUnencryptedL2Log` object.
     */
    static fromString(data) {
        const buffer = Buffer.from(data, 'hex');
        return ExtendedUnencryptedL2Log.fromBuffer(buffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRfdW5lbmNyeXB0ZWRfbDJfbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ3MvZXh0ZW5kZWRfdW5lbmNyeXB0ZWRfbDJfbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQztJQUNFLHFDQUFxQztJQUNyQixFQUFTO0lBQ3pCLG9DQUFvQztJQUNwQixHQUFxQjtRQUZyQixPQUFFLEdBQUYsRUFBRSxDQUFPO1FBRVQsUUFBRyxHQUFILEdBQUcsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxlQUFlO1FBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUErQjtRQUMzQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0MsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEQsT0FBTyxJQUFJLHdCQUF3QixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxPQUFPLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YifQ==