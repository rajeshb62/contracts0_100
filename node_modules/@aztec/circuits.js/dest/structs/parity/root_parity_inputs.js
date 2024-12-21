import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NUM_BASE_PARITY_PER_ROOT_PARITY, RECURSIVE_PROOF_LENGTH } from '../../constants.gen.js';
import { RootParityInput } from './root_parity_input.js';
export class RootParityInputs {
    constructor(
    /** Public inputs of children and their proofs. */
    children) {
        this.children = children;
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...this.children);
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new RootParityInputs instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const tuple = Array.from({ length: NUM_BASE_PARITY_PER_ROOT_PARITY }, () => RootParityInput.fromBuffer(reader, RECURSIVE_PROOF_LENGTH));
        return new RootParityInputs(tuple);
    }
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new RootParityInputs instance.
     */
    static fromString(str) {
        return RootParityInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdF9wYXJpdHlfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMvcGFyaXR5L3Jvb3RfcGFyaXR5X2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUYsT0FBTyxFQUFFLCtCQUErQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7SUFDRSxrREFBa0Q7SUFDbEMsUUFHZjtRQUhlLGFBQVEsR0FBUixRQUFRLENBR3ZCO0lBQ0EsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsK0JBQStCLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FDekUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FDM0QsQ0FBQztRQUNGLE9BQU8sSUFBSSxnQkFBZ0IsQ0FDekIsS0FBc0csQ0FDdkcsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGIn0=