import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CONTRACT_STORAGE_READ_LENGTH } from '../constants.gen.js';
/**
 * Contract storage read operation on a specific contract.
 *
 * Note: Similar to `PublicDataRead` but it's from the POV of contract storage so we are not working with public data
 * tree leaf index but storage slot index.
 */
export class ContractStorageRead {
    constructor(
    /**
     * Storage slot we are reading from.
     */
    storageSlot, 
    /**
     * Value read from the storage slot.
     */
    currentValue, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    counter, 
    /**
     * Contract address whose storage is being read.
     */
    contractAddress) {
        this.storageSlot = storageSlot;
        this.currentValue = currentValue;
        this.counter = counter;
        this.contractAddress = contractAddress;
    }
    static from(args) {
        return new ContractStorageRead(args.storageSlot, args.currentValue, args.counter, args.contractAddress);
    }
    toBuffer() {
        return serializeToBuffer(this.storageSlot, this.currentValue, new Fr(this.counter));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ContractStorageRead(Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader).toNumber());
    }
    static empty() {
        return new ContractStorageRead(Fr.ZERO, Fr.ZERO, 0);
    }
    isEmpty() {
        return this.storageSlot.isZero() && this.currentValue.isZero() && this.counter == 0;
    }
    toFriendlyJSON() {
        return `Slot=${this.storageSlot.toFriendlyJSON()}: ${this.currentValue.toFriendlyJSON()}`;
    }
    toFields() {
        const fields = [this.storageSlot, this.currentValue, new Fr(this.counter)];
        if (fields.length !== CONTRACT_STORAGE_READ_LENGTH) {
            throw new Error(`Invalid number of fields for ContractStorageRead. Expected ${CONTRACT_STORAGE_READ_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const storageSlot = reader.readField();
        const currentValue = reader.readField();
        const counter = reader.readField().toNumber();
        return new ContractStorageRead(storageSlot, currentValue, counter);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rfc3RvcmFnZV9yZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvY29udHJhY3Rfc3RvcmFnZV9yZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRW5FOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QjtJQUNFOztPQUVHO0lBQ2EsV0FBZTtJQUMvQjs7T0FFRztJQUNhLFlBQWdCO0lBQ2hDOztPQUVHO0lBQ2EsT0FBZTtJQUMvQjs7T0FFRztJQUNJLGVBQThCO1FBWnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1FBSWYsaUJBQVksR0FBWixZQUFZLENBQUk7UUFJaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUl4QixvQkFBZSxHQUFmLGVBQWUsQ0FBZTtJQUNwQyxDQUFDO0lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxJQUE0RjtRQUN0RyxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7SUFDNUYsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssNEJBQTRCLEVBQUUsQ0FBQztZQUNuRCxNQUFNLElBQUksS0FBSyxDQUNiLDhEQUE4RCw0QkFBNEIsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQ25ILENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU5QyxPQUFPLElBQUksbUJBQW1CLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0YifQ==