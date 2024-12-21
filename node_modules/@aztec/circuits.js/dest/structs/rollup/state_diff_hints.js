import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_NULLIFIERS_PER_TX, NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_TREE_HEIGHT, PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH, } from '../../constants.gen.js';
import { MembershipWitness } from '../membership_witness.js';
import { NullifierLeafPreimage } from '../trees/index.js';
/**
 * Hints used while proving state diff validity.
 */
export class StateDiffHints {
    constructor(
    /**
     * The nullifiers which need to be updated to perform the batch insertion of the new nullifiers.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    nullifierPredecessorPreimages, 
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    nullifierPredecessorMembershipWitnesses, 
    /**
     * The nullifiers to be inserted in the tree, sorted high to low.
     */
    sortedNullifiers, 
    /**
     * The indexes of the sorted nullifiers to the original ones.
     */
    sortedNullifierIndexes, 
    /**
     * Sibling path "pointing to" where the new note hash subtree should be inserted into the note hash tree.
     */
    noteHashSubtreeSiblingPath, 
    /**
     * Sibling path "pointing to" where the new nullifiers subtree should be inserted into the nullifier tree.
     */
    nullifierSubtreeSiblingPath, 
    /**
     * Sibling path "pointing to" where the new public data subtree should be inserted into the public data tree.
     */
    publicDataSiblingPath) {
        this.nullifierPredecessorPreimages = nullifierPredecessorPreimages;
        this.nullifierPredecessorMembershipWitnesses = nullifierPredecessorMembershipWitnesses;
        this.sortedNullifiers = sortedNullifiers;
        this.sortedNullifierIndexes = sortedNullifierIndexes;
        this.noteHashSubtreeSiblingPath = noteHashSubtreeSiblingPath;
        this.nullifierSubtreeSiblingPath = nullifierSubtreeSiblingPath;
        this.publicDataSiblingPath = publicDataSiblingPath;
    }
    static from(fields) {
        return new StateDiffHints(...StateDiffHints.getFields(fields));
    }
    static getFields(fields) {
        return [
            fields.nullifierPredecessorPreimages,
            fields.nullifierPredecessorMembershipWitnesses,
            fields.sortedNullifiers,
            fields.sortedNullifierIndexes,
            fields.noteHashSubtreeSiblingPath,
            fields.nullifierSubtreeSiblingPath,
            fields.publicDataSiblingPath,
        ];
    }
    /**
     * Serializes the state diff hints to a buffer.
     * @returns A buffer of the serialized state diff hints.
     */
    toBuffer() {
        return serializeToBuffer(...StateDiffHints.getFields(this));
    }
    /**
     * Deserializes the state diff hints from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new StateDiffHints instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new StateDiffHints(reader.readArray(MAX_NULLIFIERS_PER_TX, NullifierLeafPreimage), reader.readArray(MAX_NULLIFIERS_PER_TX, {
            fromBuffer: buffer => MembershipWitness.fromBuffer(buffer, NULLIFIER_TREE_HEIGHT),
        }), reader.readArray(MAX_NULLIFIERS_PER_TX, Fr), reader.readNumbers(MAX_NULLIFIERS_PER_TX), reader.readArray(NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, Fr), reader.readArray(NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, Fr), reader.readArray(PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH, Fr));
    }
    static empty() {
        return new StateDiffHints(makeTuple(MAX_NULLIFIERS_PER_TX, NullifierLeafPreimage.empty), makeTuple(MAX_NULLIFIERS_PER_TX, () => MembershipWitness.empty(NULLIFIER_TREE_HEIGHT)), makeTuple(MAX_NULLIFIERS_PER_TX, Fr.zero), makeTuple(MAX_NULLIFIERS_PER_TX, () => 0), makeTuple(NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, Fr.zero), makeTuple(NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, Fr.zero), makeTuple(PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH, Fr.zero));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfZGlmZl9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JvbGx1cC9zdGF0ZV9kaWZmX2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzFGLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIscUNBQXFDLEVBQ3JDLHFDQUFxQyxFQUNyQyxxQkFBcUIsRUFDckIsdUNBQXVDLEdBQ3hDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6QjtJQUNFOzs7T0FHRztJQUNJLDZCQUF5RjtJQUNoRzs7O09BR0c7SUFDSSx1Q0FHTjtJQUNEOztPQUVHO0lBQ0ksZ0JBQXlEO0lBQ2hFOztPQUVHO0lBQ0ksc0JBQW1FO0lBQzFFOztPQUVHO0lBQ0ksMEJBQW1GO0lBQzFGOztPQUVHO0lBQ0ksMkJBQW9GO0lBQzNGOztPQUVHO0lBQ0kscUJBQWdGO1FBNUJoRixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQTREO1FBS3pGLDRDQUF1QyxHQUF2Qyx1Q0FBdUMsQ0FHN0M7UUFJTSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlDO1FBSXpELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBNkM7UUFJbkUsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUF5RDtRQUluRixnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQXlEO1FBSXBGLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMkQ7SUFDdEYsQ0FBQztJQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBZ0M7UUFDMUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFnQztRQUMvQyxPQUFPO1lBQ0wsTUFBTSxDQUFDLDZCQUE2QjtZQUNwQyxNQUFNLENBQUMsdUNBQXVDO1lBQzlDLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDdkIsTUFBTSxDQUFDLHNCQUFzQjtZQUM3QixNQUFNLENBQUMsMEJBQTBCO1lBQ2pDLE1BQU0sQ0FBQywyQkFBMkI7WUFDbEMsTUFBTSxDQUFDLHFCQUFxQjtTQUNwQixDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxjQUFjLENBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsRUFDOUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRTtZQUN0QyxVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDO1NBQ2xGLENBQUMsRUFDRixNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxFQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLEVBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMscUNBQXFDLEVBQUUsRUFBRSxDQUFDLEVBQzNELE1BQU0sQ0FBQyxTQUFTLENBQUMscUNBQXFDLEVBQUUsRUFBRSxDQUFDLEVBQzNELE1BQU0sQ0FBQyxTQUFTLENBQUMsdUNBQXVDLEVBQUUsRUFBRSxDQUFDLENBQzlELENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksY0FBYyxDQUN2QixTQUFTLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQzdELFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUN0RixTQUFTLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUN6QyxTQUFTLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3pDLFNBQVMsQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQ3pELFNBQVMsQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQ3pELFNBQVMsQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0NBQ0YifQ==