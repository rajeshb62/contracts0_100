import { Fr, NullifierLeafPreimage } from '@aztec/circuits.js';
import { SiblingPath } from '../sibling_path/index.js';
/**
 * Nullifier membership witness.
 * @remarks When this represents membership witness of a low nullifier it can be used to perform a nullifier
 * non-inclusion proof by leveraging the "linked list structure" of leaves and proving that a lower nullifier
 * is pointing to a bigger next value than the nullifier we are trying to prove non-inclusion for.
 */
export class NullifierMembershipWitness {
    constructor(
    /**
     * The index of the nullifier in a tree.
     */
    index, 
    /**
     * Preimage of the nullifier.
     */
    leafPreimage, 
    /**
     * Sibling path to prove membership of the nullifier.
     */
    siblingPath) {
        this.index = index;
        this.leafPreimage = leafPreimage;
        this.siblingPath = siblingPath;
    }
    /**
     * Returns a field array representation of a nullifier witness.
     * @returns A field array representation of a nullifier witness.
     */
    toFields() {
        return [new Fr(this.index), ...this.leafPreimage.toFields(), ...this.siblingPath.toFields()];
    }
    toJSON() {
        return {
            index: '0x' + this.index.toString(16),
            leafPreimage: this.leafPreimage.toJSON(),
            siblingPath: this.siblingPath.toString(),
        };
    }
    static fromJSON(json) {
        return new NullifierMembershipWitness(BigInt(json.index), NullifierLeafPreimage.fromJSON(json.leafPreimage), SiblingPath.fromString(json.siblingPath));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbGlmaWVyX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJmYWNlcy9udWxsaWZpZXJfdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUE4QixxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTywwQkFBMEI7SUFDckM7SUFDRTs7T0FFRztJQUNhLEtBQWE7SUFDN0I7O09BRUc7SUFDYSxZQUFtQztJQUNuRDs7T0FFRztJQUNhLFdBQXNEO1FBUnRELFVBQUssR0FBTCxLQUFLLENBQVE7UUFJYixpQkFBWSxHQUFaLFlBQVksQ0FBdUI7UUFJbkMsZ0JBQVcsR0FBWCxXQUFXLENBQTJDO0lBQ3JFLENBQUM7SUFFSjs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3hDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBUztRQUN2QixPQUFPLElBQUksMEJBQTBCLENBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQ2xCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2pELFdBQVcsQ0FBQyxVQUFVLENBQStCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDdkUsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9