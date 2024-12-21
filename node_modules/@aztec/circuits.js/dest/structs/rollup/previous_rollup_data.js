import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { MembershipWitness } from '../membership_witness.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
import { BaseOrMergeRollupPublicInputs } from './base_or_merge_rollup_public_inputs.js';
/**
 * Represents the data of a previous merge or base rollup circuit.
 */
export class PreviousRollupData {
    constructor(
    /**
     * Public inputs to the base or merge rollup circuit.
     */
    baseOrMergeRollupPublicInputs, 
    /**
     * The proof of the base or merge rollup circuit.
     */
    proof, 
    /**
     * The verification key of the base or merge rollup circuit.
     */
    vk, 
    /**
     * Sibling path of the rollup circuit's vk in a big tree of rollup circuit vks.
     */
    vkWitness) {
        this.baseOrMergeRollupPublicInputs = baseOrMergeRollupPublicInputs;
        this.proof = proof;
        this.vk = vk;
        this.vkWitness = vkWitness;
    }
    /**
     * Serializes previous rollup data to a buffer.
     * @returns The buffer of the serialized previous rollup data.
     */
    toBuffer() {
        return serializeToBuffer(this.baseOrMergeRollupPublicInputs, this.proof, this.vk, this.vkWitness);
    }
    /**
     * Deserializes previous rollup data from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new PreviousRollupData instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PreviousRollupData(reader.readObject(BaseOrMergeRollupPublicInputs), RecursiveProof.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH), reader.readObject(VerificationKeyAsFields), MembershipWitness.fromBuffer(reader, VK_TREE_HEIGHT));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlvdXNfcm9sbHVwX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9yb2xsdXAvcHJldmlvdXNfcm9sbHVwX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCO0lBQ0U7O09BRUc7SUFDSSw2QkFBNEQ7SUFDbkU7O09BRUc7SUFDSSxLQUEyRDtJQUNsRTs7T0FFRztJQUNJLEVBQTJCO0lBQ2xDOztPQUVHO0lBQ0ksU0FBbUQ7UUFabkQsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUk1RCxVQUFLLEdBQUwsS0FBSyxDQUFzRDtRQUkzRCxPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUkzQixjQUFTLEdBQVQsU0FBUyxDQUEwQztJQUN6RCxDQUFDO0lBRUo7OztPQUdHO0lBQ0ksUUFBUTtRQUNiLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGtCQUFrQixDQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLEVBQ2hELGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLDZCQUE2QixDQUFDLEVBQ2hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFDMUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FDckQsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9