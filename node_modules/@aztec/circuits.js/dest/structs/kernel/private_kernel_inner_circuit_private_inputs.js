import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PrivateCallData } from './private_call_data.js';
import { PrivateKernelData } from './private_kernel_data.js';
/**
 * Input to the private kernel circuit - Inner call.
 */
export class PrivateKernelInnerCircuitPrivateInputs {
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel, 
    /**
     * Private calldata corresponding to this iteration of the kernel.
     */
    privateCall) {
        this.previousKernel = previousKernel;
        this.privateCall = privateCall;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.previousKernel, this.privateCall);
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelInnerCircuitPrivateInputs(reader.readObject(PrivateKernelData), reader.readObject(PrivateCallData));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfaW5uZXJfY2lyY3VpdF9wcml2YXRlX2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9wcml2YXRlX2tlcm5lbF9pbm5lcl9jaXJjdWl0X3ByaXZhdGVfaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFN0Q7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0NBQXNDO0lBQ2pEO0lBQ0U7O09BRUc7SUFDSSxjQUFpQztJQUN4Qzs7T0FFRztJQUNJLFdBQTRCO1FBSjVCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUlqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFDbEMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxzQ0FBc0MsQ0FDL0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNwQyxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGIn0=