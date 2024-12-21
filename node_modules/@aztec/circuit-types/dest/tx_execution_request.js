import { AztecAddress, Fr, FunctionData, FunctionSelector, TxContext, TxRequest, Vector } from '@aztec/circuits.js';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { AuthWitness } from './auth_witness.js';
import { PackedValues } from './packed_values.js';
/**
 * Request to execute a transaction. Similar to TxRequest, but has the full args.
 */
export class TxExecutionRequest {
    constructor(
    /**
     * Sender.
     */
    origin, 
    /**
     * Selector of the function to call.
     */
    functionSelector, 
    /**
     * The hash of arguments of first call to be executed (usually account entrypoint).
     * @dev This hash is a pointer to `argsOfCalls` unordered array.
     */
    firstCallArgsHash, 
    /**
     * Transaction context.
     */
    txContext, 
    /**
     * An unordered array of packed arguments for each call in the transaction.
     * @dev These arguments are accessed in Noir via oracle and constrained against the args hash. The length of
     * the array is equal to the number of function calls in the transaction (1 args per 1 call).
     */
    argsOfCalls, 
    /**
     * Transient authorization witnesses for authorizing the execution of one or more actions during this tx.
     * These witnesses are not expected to be stored in the local witnesses database of the PXE.
     */
    authWitnesses) {
        this.origin = origin;
        this.functionSelector = functionSelector;
        this.firstCallArgsHash = firstCallArgsHash;
        this.txContext = txContext;
        this.argsOfCalls = argsOfCalls;
        this.authWitnesses = authWitnesses;
    }
    toTxRequest() {
        return new TxRequest(this.origin, 
        // Entrypoints must be private as as defined by the protocol.
        new FunctionData(this.functionSelector, true /* isPrivate */), this.firstCallArgsHash, this.txContext);
    }
    static getFields(fields) {
        return [
            fields.origin,
            fields.functionSelector,
            fields.firstCallArgsHash,
            fields.txContext,
            fields.argsOfCalls,
            fields.authWitnesses,
        ];
    }
    static from(fields) {
        return new TxExecutionRequest(...TxExecutionRequest.getFields(fields));
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.origin, this.functionSelector, this.firstCallArgsHash, this.txContext, new Vector(this.argsOfCalls), new Vector(this.authWitnesses));
    }
    /**
     * Serialize as a string.
     * @returns The string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new TxExecutionRequest(reader.readObject(AztecAddress), reader.readObject(FunctionSelector), Fr.fromBuffer(reader), reader.readObject(TxContext), reader.readVector(PackedValues), reader.readVector(AuthWitness));
    }
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromString(str) {
        return TxExecutionRequest.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfZXhlY3V0aW9uX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHhfZXhlY3V0aW9uX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEgsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCO0lBQ0U7O09BRUc7SUFDSSxNQUFvQjtJQUMzQjs7T0FFRztJQUNJLGdCQUFrQztJQUN6Qzs7O09BR0c7SUFDSSxpQkFBcUI7SUFDNUI7O09BRUc7SUFDSSxTQUFvQjtJQUMzQjs7OztPQUlHO0lBQ0ksV0FBMkI7SUFDbEM7OztPQUdHO0lBQ0ksYUFBNEI7UUF4QjVCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFJcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUtsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQUk7UUFJckIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQU1wQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFLM0Isa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbEMsQ0FBQztJQUVKLFdBQVc7UUFDVCxPQUFPLElBQUksU0FBUyxDQUNsQixJQUFJLENBQUMsTUFBTTtRQUNYLDZEQUE2RDtRQUM3RCxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUM3RCxJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW9DO1FBQ25ELE9BQU87WUFDTCxNQUFNLENBQUMsTUFBTTtZQUNiLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDdkIsTUFBTSxDQUFDLGlCQUFpQjtZQUN4QixNQUFNLENBQUMsU0FBUztZQUNoQixNQUFNLENBQUMsV0FBVztZQUNsQixNQUFNLENBQUMsYUFBYTtTQUNaLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFvQztRQUM5QyxPQUFPLElBQUksa0JBQWtCLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUM1QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksa0JBQWtCLENBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFDbkMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFDNUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGIn0=