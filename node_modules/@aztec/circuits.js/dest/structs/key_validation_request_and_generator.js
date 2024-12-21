import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH } from '../constants.gen.js';
import { KeyValidationRequest } from './key_validation_request.js';
/**
 * Request for validating keys used in the app and a generator.
 */
export class KeyValidationRequestAndGenerator {
    constructor(
    /** The key validation request. */
    request, 
    /**
     * The generator index which can be used along with sk_m to derive the sk_app stored in the request.
     * Note: This generator constrains that a correct key type gets validated in the kernel.
     */
    skAppGenerator) {
        this.request = request;
        this.skAppGenerator = skAppGenerator;
    }
    toBuffer() {
        return serializeToBuffer(this.request, this.skAppGenerator);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new KeyValidationRequestAndGenerator(reader.readObject(KeyValidationRequest), Fr.fromBuffer(reader));
    }
    toFields() {
        const fields = [...this.request.toFields(), this.skAppGenerator];
        if (fields.length !== KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH) {
            throw new Error(`Invalid number of fields for KeyValidationRequestAndGenerator. Expected ${KEY_VALIDATION_REQUEST_AND_GENERATOR_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new KeyValidationRequestAndGenerator(KeyValidationRequest.fromFields(reader), reader.readField());
    }
    isEmpty() {
        return this.request.isEmpty() && this.skAppGenerator.isZero();
    }
    static empty() {
        return new KeyValidationRequestAndGenerator(KeyValidationRequest.empty(), Fr.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X3ZhbGlkYXRpb25fcmVxdWVzdF9hbmRfZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMva2V5X3ZhbGlkYXRpb25fcmVxdWVzdF9hbmRfZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdDQUFnQztJQUMzQztJQUNFLGtDQUFrQztJQUNsQixPQUE2QjtJQUM3Qzs7O09BR0c7SUFDYSxjQUFrQjtRQUxsQixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUs3QixtQkFBYyxHQUFkLGNBQWMsQ0FBSTtJQUNqQyxDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksZ0NBQWdDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssMkNBQTJDLEVBQUUsQ0FBQztZQUNsRSxNQUFNLElBQUksS0FBSyxDQUNiLDJFQUEyRSwyQ0FBMkMsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQy9JLENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksZ0NBQWdDLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLGdDQUFnQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0YifQ==