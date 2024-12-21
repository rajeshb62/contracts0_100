import { AztecAddress } from '@aztec/foundation/aztec-address';
import { randomInt } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * The recipient of an L2 message.
 */
export class L2Actor {
    constructor(
    /**
     * The recipient of the message.
     */
    recipient, 
    /**
     * The version of the protocol.
     */
    version) {
        this.recipient = recipient;
        this.version = version;
    }
    static empty() {
        return new L2Actor(AztecAddress.ZERO, 0);
    }
    toFields() {
        return [this.recipient.toField(), new Fr(BigInt(this.version))];
    }
    toBuffer() {
        return serializeToBuffer(this.recipient, this.version);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const aztecAddr = AztecAddress.fromBuffer(reader);
        const version = reader.readNumber();
        return new L2Actor(aztecAddr, version);
    }
    static random() {
        return new L2Actor(AztecAddress.random(), randomInt(1000));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDJfYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVzc2FnaW5nL2wyX2FjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RTs7R0FFRztBQUNILE1BQU0sT0FBTyxPQUFPO0lBQ2xCO0lBQ0U7O09BRUc7SUFDYSxTQUF1QjtJQUN2Qzs7T0FFRztJQUNhLE9BQWU7UUFKZixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSXZCLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDOUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGIn0=