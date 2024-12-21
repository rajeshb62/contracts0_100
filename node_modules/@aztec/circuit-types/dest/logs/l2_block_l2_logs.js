import { BufferReader, prefixBufferWithLength } from '@aztec/foundation/serialize';
import isEqual from 'lodash.isequal';
import { EncryptedNoteTxL2Logs, EncryptedTxL2Logs, UnencryptedTxL2Logs } from './tx_l2_logs.js';
/**
 * Data container of logs emitted in all txs in a given L2 block.
 */
export class L2BlockL2Logs {
    constructor(
    /**
     * An array containing logs emitted in individual function invocations in this tx.
     */
    txLogs) {
        this.txLogs = txLogs;
    }
    /**
     * Serializes logs into a buffer.
     * @returns A buffer containing the serialized logs.
     */
    toBuffer() {
        const serializedTxLogs = this.txLogs.map(logs => logs.toBuffer());
        // Concatenate all serialized function logs into a single buffer and prefix it with 4 bytes for its total length.
        return prefixBufferWithLength(Buffer.concat(serializedTxLogs));
    }
    /**
     * Get the total length of serialized data.
     * @returns Total length of serialized data.
     */
    getSerializedLength() {
        return this.txLogs.reduce((acc, logs) => acc + logs.getSerializedLength(), 0) + 4;
    }
    /**
     * Gets the total number of logs emitted from all the TxL2Logs.
     */
    getTotalLogCount() {
        return this.txLogs.reduce((acc, logs) => acc + logs.getTotalLogCount(), 0);
    }
    /**
     * Seralizes logs into a string.
     * @returns A string representation of the serialized logs.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Convert a L2BlockL2Logs class object to a plain JSON object.
     * @returns A plain object with L2BlockL2Logs properties.
     */
    toJSON() {
        return {
            txLogs: this.txLogs.map(log => log.toJSON()),
        };
    }
    /**
     * Checks if two L2BlockL2Logs objects are equal.
     * @param other - Another L2BlockL2Logs object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other) {
        return isEqual(this, other);
    }
    /**
     * Returns the total number of log entries across an array of L2BlockL2Logs.
     * @param l2BlockL2logs - L2BlockL2Logs to sum over.
     * @returns Total sum of log entries.
     */
    static getTotalLogCount(l2BlockL2logs) {
        return l2BlockL2logs.reduce((sum, log) => sum + log.getTotalLogCount(), 0);
    }
}
export class EncryptedNoteL2BlockL2Logs extends L2BlockL2Logs {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj) {
        const txLogs = obj.txLogs.map((log) => EncryptedNoteTxL2Logs.fromJSON(log));
        return new EncryptedNoteL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const logsBufLength = reader.readNumber();
        const serializedTxLogs = reader.readBufferArray(logsBufLength);
        const txLogs = serializedTxLogs.map(logs => EncryptedNoteTxL2Logs.fromBuffer(logs, false));
        return new EncryptedNoteL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data) {
        const buffer = Buffer.from(data, 'hex');
        return EncryptedNoteL2BlockL2Logs.fromBuffer(buffer);
    }
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs, numCalls, numLogsPerCall) {
        const txLogs = [];
        for (let i = 0; i < numTxs; i++) {
            txLogs.push(EncryptedNoteTxL2Logs.random(numCalls, numLogsPerCall));
        }
        return new EncryptedNoteL2BlockL2Logs(txLogs);
    }
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs) {
        const logs = [];
        for (const blockLog of blockLogs) {
            if (blockLog) {
                for (const txLog of blockLog.txLogs) {
                    logs.push(...txLog.unrollLogs());
                }
            }
        }
        return logs;
    }
}
export class EncryptedL2BlockL2Logs extends L2BlockL2Logs {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj) {
        const txLogs = obj.txLogs.map((log) => EncryptedTxL2Logs.fromJSON(log));
        return new EncryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const logsBufLength = reader.readNumber();
        const serializedTxLogs = reader.readBufferArray(logsBufLength);
        const txLogs = serializedTxLogs.map(logs => EncryptedTxL2Logs.fromBuffer(logs, false));
        return new EncryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data) {
        const buffer = Buffer.from(data, 'hex');
        return EncryptedL2BlockL2Logs.fromBuffer(buffer);
    }
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs, numCalls, numLogsPerCall) {
        const txLogs = [];
        for (let i = 0; i < numTxs; i++) {
            txLogs.push(EncryptedTxL2Logs.random(numCalls, numLogsPerCall));
        }
        return new EncryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs) {
        const logs = [];
        for (const blockLog of blockLogs) {
            if (blockLog) {
                for (const txLog of blockLog.txLogs) {
                    logs.push(...txLog.unrollLogs());
                }
            }
        }
        return logs;
    }
}
export class UnencryptedL2BlockL2Logs extends L2BlockL2Logs {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj) {
        const txLogs = obj.txLogs.map((log) => UnencryptedTxL2Logs.fromJSON(log));
        return new UnencryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const logsBufLength = reader.readNumber();
        const serializedTxLogs = reader.readBufferArray(logsBufLength);
        const txLogs = serializedTxLogs.map(logs => UnencryptedTxL2Logs.fromBuffer(logs, false));
        return new UnencryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data) {
        const buffer = Buffer.from(data, 'hex');
        return UnencryptedL2BlockL2Logs.fromBuffer(buffer);
    }
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs, numCalls, numLogsPerCall) {
        const txLogs = [];
        for (let i = 0; i < numTxs; i++) {
            txLogs.push(UnencryptedTxL2Logs.random(numCalls, numLogsPerCall));
        }
        return new UnencryptedL2BlockL2Logs(txLogs);
    }
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs) {
        const logs = [];
        for (const blockLog of blockLogs) {
            if (blockLog) {
                for (const txLog of blockLog.txLogs) {
                    logs.push(...txLog.unrollLogs());
                }
            }
        }
        return logs;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDJfYmxvY2tfbDJfbG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dzL2wyX2Jsb2NrX2wyX2xvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5GLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsRUFBaUIsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUcvRzs7R0FFRztBQUNILE1BQU0sT0FBZ0IsYUFBYTtJQUNqQztJQUNFOztPQUVHO0lBQ2EsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFDdkMsQ0FBQztJQUVKOzs7T0FHRztJQUNJLFFBQVE7UUFDYixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEUsaUhBQWlIO1FBQ2pILE9BQU8sc0JBQXNCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1CQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxnQkFBZ0I7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVB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