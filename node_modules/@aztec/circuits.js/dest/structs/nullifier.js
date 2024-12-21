import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class Nullifier {
    constructor(value, counter, noteHash) {
        this.value = value;
        this.counter = counter;
        this.noteHash = noteHash;
    }
    toFields() {
        return [this.value, new Fr(this.counter), this.noteHash];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new Nullifier(reader.readField(), reader.readU32(), reader.readField());
    }
    isEmpty() {
        return this.value.isZero() && !this.counter && this.noteHash.isZero();
    }
    static empty() {
        return new Nullifier(Fr.zero(), 0, Fr.zero());
    }
    toBuffer() {
        return serializeToBuffer(this.value, this.counter, this.noteHash);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new Nullifier(Fr.fromBuffer(reader), reader.readNumber(), Fr.fromBuffer(reader));
    }
    toString() {
        return `value=${this.value} counter=${this.counter} noteHash=${this.noteHash}`;
    }
    scope(contractAddress) {
        return new ScopedNullifier(this, contractAddress);
    }
}
export class ScopedNullifier {
    constructor(nullifier, contractAddress) {
        this.nullifier = nullifier;
        this.contractAddress = contractAddress;
    }
    get counter() {
        return this.nullifier.counter;
    }
    get value() {
        return this.nullifier.value;
    }
    get nullifiedNoteHash() {
        return this.nullifier.noteHash;
    }
    toFields() {
        return [...this.nullifier.toFields(), this.contractAddress.toField()];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ScopedNullifier(reader.readObject(Nullifier), AztecAddress.fromField(reader.readField()));
    }
    isEmpty() {
        return this.nullifier.isEmpty() && this.contractAddress.isZero();
    }
    static empty() {
        return new ScopedNullifier(Nullifier.empty(), AztecAddress.ZERO);
    }
    toBuffer() {
        return serializeToBuffer(this.nullifier, this.contractAddress);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ScopedNullifier(Nullifier.fromBuffer(reader), AztecAddress.fromBuffer(reader));
    }
    toString() {
        return `nullifier=${this.nullifier} contractAddress=${this.contractAddress}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvbnVsbGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUkzRixNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFtQixLQUFTLEVBQVMsT0FBZSxFQUFTLFFBQVk7UUFBdEQsVUFBSyxHQUFMLEtBQUssQ0FBSTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFJO0lBQUcsQ0FBQztJQUU3RSxRQUFRO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUEwQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUks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