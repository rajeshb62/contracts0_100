import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
/**
 * Write operations on the public data tree including the previous value.
 */
export class PublicDataUpdateRequest {
    constructor(
    /**
     * Index of the leaf in the public data tree which is to be updated.
     */
    leafSlot, 
    /**
     * New value of the leaf.
     */
    newValue, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    sideEffectCounter) {
        this.leafSlot = leafSlot;
        this.newValue = newValue;
        this.sideEffectCounter = sideEffectCounter;
    }
    static from(args) {
        return new PublicDataUpdateRequest(args.leafIndex, args.newValue, args.sideEffectCounter);
    }
    get counter() {
        return this.sideEffectCounter;
    }
    get position() {
        return this.leafSlot;
    }
    toBuffer() {
        return serializeToBuffer(this.leafSlot, this.newValue, this.sideEffectCounter);
    }
    isEmpty() {
        return this.leafSlot.isZero() && this.newValue.isZero();
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicDataUpdateRequest(reader.readField(), reader.readField(), reader.readU32());
    }
    static isEmpty(x) {
        return x.isEmpty();
    }
    equals(other) {
        return this.leafSlot.equals(other.leafSlot) && this.newValue.equals(other.newValue);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataUpdateRequest(Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readNumber());
    }
    static empty() {
        return new PublicDataUpdateRequest(Fr.ZERO, Fr.ZERO, 0);
    }
    toFriendlyJSON() {
        return `Leaf=${this.leafSlot.toFriendlyJSON()}: ${this.newValue.toFriendlyJSON()}, SideEffectCounter=${this.sideEffectCounter}`;
    }
    [inspect.custom]() {
        return `PublicDataUpdateRequest { leafSlot: ${this.leafSlot.toFriendlyJSON()}, newValue: ${this.newValue.toFriendlyJSON()}, sideEffectCounter: ${this.sideEffectCounter} }`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfdXBkYXRlX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wdWJsaWNfZGF0YV91cGRhdGVfcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9COztHQUVHO0FBQ0gsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQztJQUNFOztPQUVHO0lBQ2EsUUFBWTtJQUM1Qjs7T0FFRztJQUNhLFFBQVk7SUFDNUI7O09BRUc7SUFDYSxpQkFBeUI7UUFSekIsYUFBUSxHQUFSLFFBQVEsQ0FBSTtRQUlaLGFBQVEsR0FBUixRQUFRLENBQUk7UUFJWixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7SUFDeEMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFjWDtRQUNDLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBMEI7UUFDdkMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUE4QjtRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksdUJBQXVCLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSx1QkFDOUUsSUFBSSxDQUFDLGlCQUNQLEVBQUUsQ0FBQztJQUNMLENBQUM7SUFFRCxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLHVDQUF1QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxlQUFlLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLHdCQUN2SCxJQUFJLENBQUMsaUJBQ1AsSUFBSSxDQUFDO0lBQ1AsQ0FBQztDQUNGIn0=