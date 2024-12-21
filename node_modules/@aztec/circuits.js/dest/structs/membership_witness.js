import { assertMemberLength } from '@aztec/foundation/array';
import { toBigIntBE, toBufferBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Contains information which can be used to prove that a leaf is a member of a Merkle tree.
 */
export class MembershipWitness {
    constructor(
    /**
     * Size of the sibling path (number of fields it contains).
     */
    pathSize, 
    /**
     * Index of a leaf in the Merkle tree.
     */
    leafIndex, 
    /**
     * Sibling path of the leaf in the Merkle tree.
     */
    siblingPath) {
        this.leafIndex = leafIndex;
        this.siblingPath = siblingPath;
        assertMemberLength(this, 'siblingPath', pathSize);
    }
    toBuffer() {
        return serializeToBuffer(toBufferBE(this.leafIndex, 32), ...this.siblingPath);
    }
    /**
     * Creates a random membership witness. Used for testing purposes.
     * @param pathSize - Number of fields in the sibling path.
     * @returns Random membership witness.
     */
    static random(pathSize) {
        return new MembershipWitness(pathSize, 0n, Array(pathSize)
            .fill(0)
            .map(() => Fr.random()));
    }
    /**
     * Creates a membership witness whose sibling path is full of zero fields.
     * @param pathSize - Number of fields in the sibling path.
     * @param leafIndex - Index of the leaf in the Merkle tree.
     * @returns Membership witness with zero sibling path.
     */
    static empty(pathSize, leafIndex = 0n) {
        const arr = Array(pathSize)
            .fill(0)
            .map(() => Fr.ZERO);
        return new MembershipWitness(pathSize, leafIndex, arr);
    }
    static fromBufferArray(leafIndex, siblingPath) {
        return new MembershipWitness(siblingPath.length, leafIndex, siblingPath.map(x => Fr.fromBuffer(x)));
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized `MembershipWitness`.
     */
    static fromBuffer(buffer, size) {
        const reader = BufferReader.asReader(buffer);
        const leafIndex = toBigIntBE(reader.readBytes(32));
        const siblingPath = reader.readArray(size, Fr);
        return new MembershipWitness(size, leafIndex, siblingPath);
    }
    /**
     * Creates a deserializer object for a MembershipWitness with a given size.
     * @param size - Expected size of the witness.
     * @returns A deserializer object.
     */
    static deserializer(size) {
        return {
            fromBuffer: (buffer) => {
                const reader = BufferReader.asReader(buffer);
                const leafIndex = toBigIntBE(reader.readBytes(32));
                const siblingPath = reader.readArray(size, Fr);
                return new MembershipWitness(size, leafIndex, siblingPath);
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyc2hpcF93aXRuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvbWVtYmVyc2hpcF93aXRuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDekUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRjs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7SUFDRTs7T0FFRztJQUNILFFBQVc7SUFDWDs7T0FFRztJQUNJLFNBQWlCO0lBQ3hCOztPQUVHO0lBQ0ksV0FBeUI7UUFKekIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUlqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUVoQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQW1CLFFBQVc7UUFDaEQsT0FBTyxJQUFJLGlCQUFpQixDQUMxQixRQUFRLEVBQ1IsRUFBRSxFQUNGLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBaUIsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQW1CLFFBQVcsRUFBRSxTQUFTLEdBQUcsRUFBRTtRQUMvRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDUCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBaUIsQ0FBQztRQUN0QyxPQUFPLElBQUksaUJBQWlCLENBQUksUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBbUIsU0FBaUIsRUFBRSxXQUE2QjtRQUN2RixPQUFPLElBQUksaUJBQWlCLENBQzFCLFdBQVcsQ0FBQyxNQUFXLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBaUIsQ0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBbUIsTUFBNkIsRUFBRSxJQUFPO1FBQ3hFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQW1CLElBQU87UUFDM0MsT0FBTztZQUNMLFVBQVUsRUFBRSxDQUFDLE1BQTZCLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzdELENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQztDQU1GIn0=