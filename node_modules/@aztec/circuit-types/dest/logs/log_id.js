import { INITIAL_L2_BLOCK_NUM } from '@aztec/circuits.js/constants';
import { toBufferBE } from '@aztec/foundation/bigint-buffer';
import { BufferReader } from '@aztec/foundation/serialize';
/** A globally unique log id. */
export class LogId {
    /**
     * Parses a log id from a string.
     * @param blockNumber - The block number.
     * @param txIndex - The transaction index.
     * @param logIndex - The log index.
     */
    constructor(
    /** The block number the log was emitted in. */
    blockNumber, 
    /** The index of a tx in a block the log was emitted in. */
    txIndex, 
    /** The index of a log the tx was emitted in. */
    logIndex) {
        this.blockNumber = blockNumber;
        this.txIndex = txIndex;
        this.logIndex = logIndex;
        if (!Number.isInteger(blockNumber) || blockNumber < INITIAL_L2_BLOCK_NUM) {
            throw new Error(`Invalid block number: ${blockNumber}`);
        }
        if (!Number.isInteger(txIndex)) {
            throw new Error(`Invalid tx index: ${txIndex}`);
        }
        if (!Number.isInteger(logIndex)) {
            throw new Error(`Invalid log index: ${logIndex}`);
        }
    }
    /**
     * Serializes log id to a buffer.
     * @returns A buffer containing the serialized log id.
     */
    toBuffer() {
        return Buffer.concat([
            toBufferBE(BigInt(this.blockNumber), 4),
            toBufferBE(BigInt(this.txIndex), 4),
            toBufferBE(BigInt(this.logIndex), 4),
        ]);
    }
    /**
     * Creates a LogId from a buffer.
     * @param buffer - A buffer containing the serialized log id.
     * @returns A log id.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const blockNumber = reader.readNumber();
        const txIndex = reader.readNumber();
        const logIndex = reader.readNumber();
        return new LogId(blockNumber, txIndex, logIndex);
    }
    /**
     * Converts the LogId instance to a string.
     * @returns A string representation of the log id.
     */
    toString() {
        return `${this.blockNumber}-${this.txIndex}-${this.logIndex}`;
    }
    /**
     * Creates a LogId from a string.
     * @param data - A string representation of a log id.
     * @returns A log id.
     */
    static fromString(data) {
        const [rawBlockNumber, rawTxIndex, rawLogIndex] = data.split('-');
        const blockNumber = Number(rawBlockNumber);
        const txIndex = Number(rawTxIndex);
        const logIndex = Number(rawLogIndex);
        return new LogId(blockNumber, txIndex, logIndex);
    }
    /**
     * Serializes log id to a human readable string.
     * @returns A human readable representation of the log id.
     */
    toHumanReadable() {
        return `logId: (blockNumber: ${this.blockNumber}, txIndex: ${this.txIndex}, logIndex: ${this.logIndex})`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nX2lkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ3MvbG9nX2lkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsZ0NBQWdDO0FBQ2hDLE1BQU0sT0FBTyxLQUFLO0lBQ2hCOzs7OztPQUtHO0lBQ0g7SUFDRSwrQ0FBK0M7SUFDL0IsV0FBbUI7SUFDbkMsMkRBQTJEO0lBQzNDLE9BQWU7SUFDL0IsZ0RBQWdEO0lBQ2hDLFFBQWdCO1FBSmhCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRW5CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFFZixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRWhDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1lBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVyQyxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUM1QixNQUFNLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXJDLE9BQU8sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZUFBZTtRQUNwQixPQUFPLHdCQUF3QixJQUFJLENBQUMsV0FBVyxjQUFjLElBQUksQ0FBQyxPQUFPLGVBQWUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO0lBQzNHLENBQUM7Q0FDRiJ9