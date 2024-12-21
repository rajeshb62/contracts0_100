import { MAX_ENCRYPTED_LOGS_PER_CALL, MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_CALL, } from '@aztec/circuits.js';
import { sha256Trunc } from '@aztec/foundation/crypto';
import { BufferReader, prefixBufferWithLength } from '@aztec/foundation/serialize';
import { EncryptedL2Log } from './encrypted_l2_log.js';
import { EncryptedL2NoteLog } from './encrypted_l2_note_log.js';
import { UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Data container of logs emitted in 1 function invocation (corresponds to 1 kernel iteration).
 */
export class FunctionL2Logs {
    constructor(
    /**
     * An array of logs.
     */
    logs) {
        this.logs = logs;
    }
    /**
     * Serializes all function logs into a buffer.
     * @returns A buffer containing the serialized logs.
     * @remarks Each log is prefixed with 4 bytes for its length, then all the serialized logs are concatenated and
     *          the resulting buffer is prefixed with 4 bytes for its total length.
     */
    toBuffer() {
        const serializedLogs = this.logs.map(log => prefixBufferWithLength(log.toBuffer()));
        return prefixBufferWithLength(Buffer.concat(serializedLogs));
    }
    /**
     * Get the total length of all serialized data
     * @returns Total length of serialized data.
     */
    getSerializedLength() {
        // adding 4 for the resulting buffer length.
        return this.getKernelLength() + 4;
    }
    /**
     * Get the total length of all chargable data (raw log data + 4 for each log)
     * TODO: Rename this? getChargableLength? getDALength?
     * @returns Total length of data.
     */
    getKernelLength() {
        // Adding 4 to each log's length to account for the size stored in the serialized buffer
        return this.logs.reduce((acc, log) => acc + log.length + 4, 0);
    }
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash() {
        // Truncated SHA hash of the concatenation of the hash of each inner log
        // Changed in resolving #5017 to mimic logs hashing in kernels
        const preimage = Buffer.concat(this.logs.map(l => l.hash()));
        return sha256Trunc(preimage);
    }
    /**
     * Convert a FunctionL2Logs class object to a plain JSON object.
     * @returns A plain object with FunctionL2Logs properties.
     */
    toJSON() {
        return {
            logs: this.logs.map(log => log.toJSON()),
        };
    }
}
export class EncryptedNoteFunctionL2Logs extends FunctionL2Logs {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty() {
        return new EncryptedNoteFunctionL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = new BufferReader(buf, 0);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const logs = reader.readBufferArray(logsBufLength);
        return new EncryptedNoteFunctionL2Logs(logs.map(EncryptedL2NoteLog.fromBuffer));
    }
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new EncryptedNoteFunctionL2Logs object.
     */
    static random(numLogs) {
        if (numLogs > MAX_NOTE_ENCRYPTED_LOGS_PER_CALL) {
            throw new Error(`Trying to create ${numLogs} logs for one call (max: ${MAX_NOTE_ENCRYPTED_LOGS_PER_CALL})`);
        }
        const logs = [];
        for (let i = 0; i < numLogs; i++) {
            logs.push(EncryptedL2NoteLog.random());
        }
        return new EncryptedNoteFunctionL2Logs(logs);
    }
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj) {
        const logs = obj.logs.map(EncryptedL2NoteLog.fromJSON);
        return new EncryptedNoteFunctionL2Logs(logs);
    }
}
export class EncryptedFunctionL2Logs extends FunctionL2Logs {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty() {
        return new EncryptedFunctionL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = new BufferReader(buf, 0);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const logs = reader.readBufferArray(logsBufLength);
        return new EncryptedFunctionL2Logs(logs.map(EncryptedL2Log.fromBuffer));
    }
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new EncryptedFunctionL2Logs object.
     */
    static random(numLogs) {
        if (numLogs > MAX_ENCRYPTED_LOGS_PER_CALL) {
            throw new Error(`Trying to create ${numLogs} logs for one call (max: ${MAX_ENCRYPTED_LOGS_PER_CALL})`);
        }
        const logs = [];
        for (let i = 0; i < numLogs; i++) {
            logs.push(EncryptedL2Log.random());
        }
        return new EncryptedFunctionL2Logs(logs);
    }
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj) {
        const logs = obj.logs.map(EncryptedL2Log.fromJSON);
        return new EncryptedFunctionL2Logs(logs);
    }
}
export class UnencryptedFunctionL2Logs extends FunctionL2Logs {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty() {
        return new UnencryptedFunctionL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = new BufferReader(buf, 0);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const logs = reader.readBufferArray(logsBufLength);
        return new UnencryptedFunctionL2Logs(logs.map(UnencryptedL2Log.fromBuffer));
    }
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new UnencryptedFunctionL2Logs object.
     */
    static random(numLogs) {
        if (numLogs > MAX_UNENCRYPTED_LOGS_PER_CALL) {
            throw new Error(`Trying to create ${numLogs} logs for one call (max: ${MAX_UNENCRYPTED_LOGS_PER_CALL})`);
        }
        const logs = [];
        for (let i = 0; i < numLogs; i++) {
            logs.push(UnencryptedL2Log.random());
        }
        return new UnencryptedFunctionL2Logs(logs);
    }
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj) {
        const logs = obj.logs.map(UnencryptedL2Log.fromJSON);
        return new UnencryptedFunctionL2Logs(logs);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fbDJfbG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dzL2Z1bmN0aW9uX2wyX2xvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixnQ0FBZ0MsRUFDaEMsNkJBQTZCLEdBQzlCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLGNBQWM7SUFDbEM7SUFDRTs7T0FFRztJQUNhLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQzNCLENBQUM7SUFFSjs7Ozs7T0FLRztJQUNJLFFBQVE7UUFDYixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEYsT0FBTyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1CQUFtQjtRQUN4Qiw0Q0FBNEM7UUFDNUMsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZTtRQUNwQix3RkFBd0Y7UUFDeEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksSUFBSTtRQUNULHdFQUF3RTtRQUN4RSw4REFBOEQ7UUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsY0FBa0M7SUFDakY7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVyxFQUFFLGdCQUFnQixHQUFHLElBQUk7UUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLCtHQUErRztRQUMvRyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQWU7UUFDbEMsSUFBSSxPQUFPLEdBQUcsZ0NBQWdDLEVBQUUsQ0FBQztZQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixPQUFPLDRCQUE0QixnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7UUFDOUcsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUF5QixFQUFFLENBQUM7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsY0FBOEI7SUFDekU7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVyxFQUFFLGdCQUFnQixHQUFHLElBQUk7UUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLCtHQUErRztRQUMvRyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQ2xDLElBQUksT0FBTyxHQUFHLDJCQUEyQixFQUFFLENBQUM7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsT0FBTyw0QkFBNEIsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO1FBQ3pHLENBQUM7UUFDRCxNQUFNLElBQUksR0FBcUIsRUFBRSxDQUFDO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQVE7UUFDN0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsY0FBZ0M7SUFDN0U7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLHlCQUF5QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVyxFQUFFLGdCQUFnQixHQUFHLElBQUk7UUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLCtHQUErRztRQUMvRyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQWU7UUFDbEMsSUFBSSxPQUFPLEdBQUcsNkJBQTZCLEVBQUUsQ0FBQztZQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixPQUFPLDRCQUE0Qiw2QkFBNkIsR0FBRyxDQUFDLENBQUM7UUFDM0csQ0FBQztRQUNELE1BQU0sSUFBSSxHQUF1QixFQUFFLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0YifQ==