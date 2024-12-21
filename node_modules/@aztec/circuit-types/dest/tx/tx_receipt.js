import { RevertCode } from '@aztec/circuits.js';
import { TxHash } from './tx_hash.js';
/**
 * Possible status of a transaction.
 */
export var TxStatus;
(function (TxStatus) {
    TxStatus["DROPPED"] = "dropped";
    TxStatus["PENDING"] = "pending";
    TxStatus["SUCCESS"] = "success";
    TxStatus["APP_LOGIC_REVERTED"] = "app_logic_reverted";
    TxStatus["TEARDOWN_REVERTED"] = "teardown_reverted";
    TxStatus["BOTH_REVERTED"] = "both_reverted";
})(TxStatus || (TxStatus = {}));
/**
 * Represents a transaction receipt in the Aztec network.
 * Contains essential information about the transaction including its status, origin, and associated addresses.
 * REFACTOR: TxReceipt should be returned only once the tx is mined, and all its fields should be required.
 * We should not be using a TxReceipt to answer a query for a pending or dropped tx.
 */
export class TxReceipt {
    constructor(
    /**
     * A unique identifier for a transaction.
     */
    txHash, 
    /**
     * The transaction's status.
     */
    status, 
    /**
     * Description of transaction error, if any.
     */
    error, 
    /**
     * The transaction fee paid for the transaction.
     */
    transactionFee, 
    /**
     * The hash of the block containing the transaction.
     */
    blockHash, 
    /**
     * The block number in which the transaction was included.
     */
    blockNumber, 
    /**
     * Information useful for testing/debugging, set when test flag is set to true in `waitOpts`.
     */
    debugInfo) {
        this.txHash = txHash;
        this.status = status;
        this.error = error;
        this.transactionFee = transactionFee;
        this.blockHash = blockHash;
        this.blockNumber = blockNumber;
        this.debugInfo = debugInfo;
    }
    /**
     * Convert a Tx class object to a plain JSON object.
     * @returns A plain object with Tx properties.
     */
    toJSON() {
        return {
            txHash: this.txHash.toString(),
            status: this.status.toString(),
            error: this.error,
            blockHash: this.blockHash?.toString('hex'),
            blockNumber: this.blockNumber,
            transactionFee: this.transactionFee?.toString(),
        };
    }
    /**
     * Convert a plain JSON object to a Tx class object.
     * @param obj - A plain Tx JSON object.
     * @returns A Tx class object.
     */
    static fromJSON(obj) {
        const txHash = TxHash.fromString(obj.txHash);
        const status = obj.status;
        const error = obj.error;
        const transactionFee = obj.transactionFee ? BigInt(obj.transactionFee) : undefined;
        const blockHash = obj.blockHash ? Buffer.from(obj.blockHash, 'hex') : undefined;
        const blockNumber = obj.blockNumber ? Number(obj.blockNumber) : undefined;
        return new TxReceipt(txHash, status, error, transactionFee, blockHash, blockNumber);
    }
    static statusFromRevertCode(revertCode) {
        if (revertCode.equals(RevertCode.OK)) {
            return TxStatus.SUCCESS;
        }
        else if (revertCode.equals(RevertCode.APP_LOGIC_REVERTED)) {
            return TxStatus.APP_LOGIC_REVERTED;
        }
        else if (revertCode.equals(RevertCode.TEARDOWN_REVERTED)) {
            return TxStatus.TEARDOWN_REVERTED;
        }
        else if (revertCode.equals(RevertCode.BOTH_REVERTED)) {
            return TxStatus.BOTH_REVERTED;
        }
        else {
            throw new Error(`Unknown revert code: ${revertCode}`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfcmVjZWlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eC90eF9yZWNlaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUtoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRDOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksUUFPWDtBQVBELFdBQVksUUFBUTtJQUNsQiwrQkFBbUIsQ0FBQTtJQUNuQiwrQkFBbUIsQ0FBQTtJQUNuQiwrQkFBbUIsQ0FBQTtJQUNuQixxREFBeUMsQ0FBQTtJQUN6QyxtREFBdUMsQ0FBQTtJQUN2QywyQ0FBK0IsQ0FBQTtBQUNqQyxDQUFDLEVBUFcsUUFBUSxLQUFSLFFBQVEsUUFPbkI7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBQ3BCO0lBQ0U7O09BRUc7SUFDSSxNQUFjO0lBQ3JCOztPQUVHO0lBQ0ksTUFBZ0I7SUFDdkI7O09BRUc7SUFDSSxLQUFhO0lBQ3BCOztPQUVHO0lBQ0ksY0FBdUI7SUFDOUI7O09BRUc7SUFDSSxTQUFrQjtJQUN6Qjs7T0FFRztJQUNJLFdBQW9CO0lBQzNCOztPQUVHO0lBQ0ksU0FBcUI7UUF4QnJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFJZCxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBSWhCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFJYixtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQUl2QixjQUFTLEdBQVQsU0FBUyxDQUFTO1FBSWxCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBSXBCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDM0IsQ0FBQztJQUVKOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzlCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFO1NBQ2hELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBUTtRQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBa0IsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNuRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoRixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDMUUsT0FBTyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFTSxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBc0I7UUFDdkQsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMxQixDQUFDO2FBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDNUQsT0FBTyxRQUFRLENBQUMsa0JBQWtCLENBQUM7UUFDckMsQ0FBQzthQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1lBQzNELE9BQU8sUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLENBQUM7YUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDdkQsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ2hDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0gsQ0FBQztDQUNGIn0=