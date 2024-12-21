import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
import { ParityPublicInputs } from './parity_public_inputs.js';
export class RootParityInput {
    constructor(
    /** The proof of the execution of the parity circuit. */
    proof, 
    /** The circuit's verification key */
    verificationKey, 
    /** The vk path in the vk tree*/
    vkPath, 
    /** The public inputs of the parity circuit. */
    publicInputs) {
        this.proof = proof;
        this.verificationKey = verificationKey;
        this.vkPath = vkPath;
        this.publicInputs = publicInputs;
    }
    toBuffer() {
        return serializeToBuffer(...RootParityInput.getFields(this));
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static from(fields) {
        return new RootParityInput(...RootParityInput.getFields(fields));
    }
    static getFields(fields) {
        return [fields.proof, fields.verificationKey, fields.vkPath, fields.publicInputs];
    }
    static fromBuffer(buffer, expectedSize) {
        const reader = BufferReader.asReader(buffer);
        return new RootParityInput(RecursiveProof.fromBuffer(reader, expectedSize), reader.readObject(VerificationKeyAsFields), reader.readArray(VK_TREE_HEIGHT, Fr), reader.readObject(ParityPublicInputs));
    }
    static fromString(str, expectedSize) {
        return RootParityInput.fromBuffer(Buffer.from(str, 'hex'), expectedSize);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdF9wYXJpdHlfaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9wYXJpdHkvcm9vdF9wYXJpdHlfaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE1BQU0sT0FBTyxlQUFlO0lBQzFCO0lBQ0Usd0RBQXdEO0lBQ3hDLEtBQW1DO0lBQ25ELHFDQUFxQztJQUNyQixlQUF3QztJQUN4RCxnQ0FBZ0M7SUFDaEIsTUFBd0M7SUFDeEQsK0NBQStDO0lBQy9CLFlBQWdDO1FBTmhDLFVBQUssR0FBTCxLQUFLLENBQThCO1FBRW5DLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtRQUV4QyxXQUFNLEdBQU4sTUFBTSxDQUFrQztRQUV4QyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFDL0MsQ0FBQztJQUVKLFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUNULE1BQStDO1FBRS9DLE9BQU8sSUFBSSxlQUFlLENBQUMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQThCLE1BQStDO1FBQzNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFVLENBQUM7SUFDN0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQ2YsTUFBNkIsRUFDN0IsWUFBMkI7UUFFM0IsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksZUFBZSxDQUN4QixjQUFjLENBQUMsVUFBVSxDQUFlLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFDN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUMxQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFDcEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQ2YsR0FBVyxFQUNYLFlBQTJCO1FBRTNCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YifQ==