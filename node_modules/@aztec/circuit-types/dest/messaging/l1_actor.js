import { randomInt } from '@aztec/foundation/crypto';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * The sender of an L1 to L2 message or recipient of an L2 to L1 message.
 */
export class L1Actor {
    constructor(
    /**
     * The sender of the message.
     */
    sender, 
    /**
     * The chain id on which the message was sent (L1 -> L2) or on which the message will be received (L2 -> L1).
     */
    chainId) {
        this.sender = sender;
        this.chainId = chainId;
    }
    static empty() {
        return new L1Actor(EthAddress.ZERO, 0);
    }
    toFields() {
        return [this.sender.toField(), new Fr(BigInt(this.chainId))];
    }
    toBuffer() {
        return serializeToBuffer(this.sender, this.chainId);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const ethAddr = reader.readObject(EthAddress);
        const chainId = reader.readNumber();
        return new L1Actor(ethAddr, chainId);
    }
    static random() {
        return new L1Actor(EthAddress.random(), randomInt(1000));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVzc2FnaW5nL2wxX2FjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RTs7R0FFRztBQUNILE1BQU0sT0FBTyxPQUFPO0lBQ2xCO0lBQ0U7O09BRUc7SUFDYSxNQUFrQjtJQUNsQzs7T0FFRztJQUNhLE9BQWU7UUFKZixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBSWxCLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDOUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGIn0=