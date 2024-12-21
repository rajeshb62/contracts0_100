import { Fr, type NULLIFIER_TREE_HEIGHT, NullifierLeafPreimage } from '@aztec/circuits.js';
import { SiblingPath } from '../sibling_path/index.js';
/**
 * Nullifier membership witness.
 * @remarks When this represents membership witness of a low nullifier it can be used to perform a nullifier
 * non-inclusion proof by leveraging the "linked list structure" of leaves and proving that a lower nullifier
 * is pointing to a bigger next value than the nullifier we are trying to prove non-inclusion for.
 */
export declare class NullifierMembershipWitness {
    /**
     * The index of the nullifier in a tree.
     */
    readonly index: bigint;
    /**
     * Preimage of the nullifier.
     */
    readonly leafPreimage: NullifierLeafPreimage;
    /**
     * Sibling path to prove membership of the nullifier.
     */
    readonly siblingPath: SiblingPath<typeof NULLIFIER_TREE_HEIGHT>;
    constructor(
    /**
     * The index of the nullifier in a tree.
     */
    index: bigint, 
    /**
     * Preimage of the nullifier.
     */
    leafPreimage: NullifierLeafPreimage, 
    /**
     * Sibling path to prove membership of the nullifier.
     */
    siblingPath: SiblingPath<typeof NULLIFIER_TREE_HEIGHT>);
    /**
     * Returns a field array representation of a nullifier witness.
     * @returns A field array representation of a nullifier witness.
     */
    toFields(): Fr[];
    toJSON(): {
        index: string;
        leafPreimage: {
            nullifier: `0x${string}`;
            nextNullifier: `0x${string}`;
            nextIndex: string;
        };
        siblingPath: string;
    };
    static fromJSON(json: any): NullifierMembershipWitness;
}
//# sourceMappingURL=nullifier_tree.d.ts.map