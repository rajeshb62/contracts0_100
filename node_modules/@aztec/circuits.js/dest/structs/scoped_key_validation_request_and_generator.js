import { AztecAddress } from '@aztec/foundation/aztec-address';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { SCOPED_KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH } from '../constants.gen.js';
import { KeyValidationRequestAndGenerator } from './key_validation_request_and_generator.js';
/**
 * Request for validating keys used in the app.
 */
export class ScopedKeyValidationRequestAndGenerator {
    constructor(request, contractAddress) {
        this.request = request;
        this.contractAddress = contractAddress;
    }
    toBuffer() {
        return serializeToBuffer(this.request, this.contractAddress);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ScopedKeyValidationRequestAndGenerator(KeyValidationRequestAndGenerator.fromBuffer(reader), AztecAddress.fromBuffer(reader));
    }
    toFields() {
        const fields = [...this.request.toFields(), this.contractAddress];
        if (fields.length !== SCOPED_KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH) {
            throw new Error(`Invalid number of fields for ScopedKeyValidationRequestAndGenerator. Expected ${SCOPED_KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ScopedKeyValidationRequestAndGenerator(KeyValidationRequestAndGenerator.fromFields(reader), AztecAddress.fromFields(reader));
    }
    isEmpty() {
        return this.request.isEmpty() && this.contractAddress.isZero();
    }
    static empty() {
        return new ScopedKeyValidationRequestAndGenerator(KeyValidationRequestAndGenerator.empty(), AztecAddress.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGVkX2tleV92YWxpZGF0aW9uX3JlcXVlc3RfYW5kX2dlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3Njb3BlZF9rZXlfdmFsaWRhdGlvbl9yZXF1ZXN0X2FuZF9nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0YsT0FBTyxFQUFFLGtEQUFrRCxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekYsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0Y7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0NBQXNDO0lBQ2pELFlBQ2tCLE9BQXlDLEVBQ3pDLGVBQTZCO1FBRDdCLFlBQU8sR0FBUCxPQUFPLENBQWtDO1FBQ3pDLG9CQUFlLEdBQWYsZUFBZSxDQUFjO0lBQzVDLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxzQ0FBc0MsQ0FDL0MsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNuRCxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGtEQUFrRCxFQUFFLENBQUM7WUFDekUsTUFBTSxJQUFJLEtBQUssQ0FDYixpRkFBaUYsa0RBQWtELFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUM1SixDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLHNDQUFzQyxDQUMvQyxnQ0FBZ0MsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQ25ELFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxzQ0FBc0MsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLEVBQUUsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakgsQ0FBQztDQUNGIn0=