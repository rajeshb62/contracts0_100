import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class ReadRequest {
    constructor(
    /**
     * The value being read.
     */
    value, 
    /**
     * The side-effect counter.
     */
    counter) {
        this.value = value;
        this.counter = counter;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.value, this.counter);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of ReadRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ReadRequest(Fr.fromBuffer(reader), reader.readNumber());
    }
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields() {
        return [this.value, new Fr(this.counter)];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ReadRequest(reader.readField(), reader.readU32());
    }
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    isEmpty() {
        return this.value.isZero() && !this.counter;
    }
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with both value and counter being zero.
     */
    static empty() {
        return new ReadRequest(Fr.zero(), 0);
    }
    scope(contractAddress) {
        return new ScopedReadRequest(this, contractAddress);
    }
}
/**
 * ReadRequest with context of the contract emitting the request.
 */
export class ScopedReadRequest {
    constructor(readRequest, contractAddress) {
        this.readRequest = readRequest;
        this.contractAddress = contractAddress;
    }
    get value() {
        return this.readRequest.value;
    }
    get counter() {
        return this.readRequest.counter;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.readRequest, this.contractAddress);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of ScopedReadRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ScopedReadRequest(ReadRequest.fromBuffer(reader), AztecAddress.fromBuffer(reader));
    }
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields() {
        return [...this.readRequest.toFields(), this.contractAddress.toField()];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ScopedReadRequest(reader.readObject(ReadRequest), AztecAddress.fromField(reader.readField()));
    }
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value, note hash and counter are all zero.
     */
    isEmpty() {
        return this.readRequest.isEmpty() && this.contractAddress.isZero();
    }
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with value, note hash and counter being zero.
     */
    static empty() {
        return new ScopedReadRequest(ReadRequest.empty(), AztecAddress.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZF9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvcmVhZF9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixNQUFNLE9BQU8sV0FBVztJQUN0QjtJQUNFOztPQUVHO0lBQ0ksS0FBUztJQUNoQjs7T0FFRztJQUNJLE9BQWU7UUFKZixVQUFLLEdBQUwsS0FBSyxDQUFJO1FBSVQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUNyQixDQUFDO0lBRUo7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENB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