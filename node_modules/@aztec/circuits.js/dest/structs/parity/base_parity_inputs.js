import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NUM_MSGS_PER_BASE_PARITY } from '../../constants.gen.js';
export class BaseParityInputs {
    constructor(
    /** Aggregated proof of all the parity circuit iterations. */
    msgs, 
    /** Root of the VK tree */
    vkTreeRoot) {
        this.msgs = msgs;
        this.vkTreeRoot = vkTreeRoot;
    }
    static fromSlice(array, index, vkTreeRoot) {
        const start = index * NUM_MSGS_PER_BASE_PARITY;
        const end = start + NUM_MSGS_PER_BASE_PARITY;
        const msgs = array.slice(start, end);
        return new BaseParityInputs(msgs, vkTreeRoot);
    }
    /** Serializes the inputs to a buffer. */
    toBuffer() {
        return serializeToBuffer(this.msgs, this.vkTreeRoot);
    }
    /** Serializes the inputs to a hex string. */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new BaseParityInputs(reader.readArray(NUM_MSGS_PER_BASE_PARITY, Fr), Fr.fromBuffer(reader));
    }
    /**
     * Deserializes the inputs from a hex string.
     * @param str - The hex string to deserialize from.
     * @returns - The deserialized inputs.
     */
    static fromString(str) {
        return BaseParityInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9wYXJpdHlfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMvcGFyaXR5L2Jhc2VfcGFyaXR5X2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFGLE9BQU8sRUFBNEMsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCO0lBQ0UsNkRBQTZEO0lBQzdDLElBQWdEO0lBQ2hFLDBCQUEwQjtJQUNWLFVBQWM7UUFGZCxTQUFJLEdBQUosSUFBSSxDQUE0QztRQUVoRCxlQUFVLEdBQVYsVUFBVSxDQUFJO0lBQzdCLENBQUM7SUFFRyxNQUFNLENBQUMsU0FBUyxDQUNyQixLQUE0RCxFQUM1RCxLQUFhLEVBQ2IsVUFBYztRQUVkLE1BQU0sS0FBSyxHQUFHLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7UUFDN0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQWtELEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELHlDQUF5QztJQUN6QyxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDM0IsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0YifQ==