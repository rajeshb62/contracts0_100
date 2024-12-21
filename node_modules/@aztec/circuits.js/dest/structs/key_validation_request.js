import { Fr, GrumpkinScalar, Point } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { KEY_VALIDATION_REQUEST_LENGTH } from '../constants.gen.js';
/**
 * Request for validating keys used in the app.
 */
export class KeyValidationRequest {
    constructor(
    /** Master public key corresponding to the same underlying secret as app secret key below. */
    pkM, skApp) {
        this.pkM = pkM;
        // I am doing this conversion here because in some places skApp is represented as GrumpkinScalar (Fq).
        // I can do this conversion even though Fq.MODULUS is larger than Fr.MODULUS because when we pass in
        // the skApp as GrumpkinScalar it was converted to that form from Fr. So, it is safe to convert it back
        // to Fr. If this would change in the future the code below will throw an error so it should be easy to debug.
        this.skApp = skApp instanceof Fr ? skApp : new Fr(skApp.toBigInt());
    }
    toBuffer() {
        return serializeToBuffer(this.pkM, this.skApp);
    }
    get skAppAsGrumpkinScalar() {
        return new GrumpkinScalar(this.skApp.toBigInt());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new KeyValidationRequest(Point.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    toFields() {
        const fields = [this.pkM.toFields(), this.skApp].flat();
        if (fields.length !== KEY_VALIDATION_REQUEST_LENGTH) {
            throw new Error(`Invalid number of fields for KeyValidationRequest. Expected ${KEY_VALIDATION_REQUEST_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new KeyValidationRequest(Point.fromFields(reader), reader.readField());
    }
    isEmpty() {
        return this.pkM.isZero() && this.skApp.isZero();
    }
    static empty() {
        return new KeyValidationRequest(Point.ZERO, Fr.ZERO);
    }
    static random() {
        return new KeyValidationRequest(Point.random(), Fr.random());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X3ZhbGlkYXRpb25fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2tleV92YWxpZGF0aW9uX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFJL0I7SUFDRSw2RkFBNkY7SUFDN0UsR0FBVSxFQUMxQixLQUEwQjtRQURWLFFBQUcsR0FBSCxHQUFHLENBQU87UUFHMUIsc0dBQXNHO1FBQ3RHLG9HQUFvRztRQUNwRyx1R0FBdUc7UUFDdkcsOEdBQThHO1FBQzlHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssNkJBQTZCLEVBQUUsQ0FBQztZQUNwRCxNQUFNLElBQUksS0FBSyxDQUNiLCtEQUErRCw2QkFBNkIsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQ3JILENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksb0JBQW9CLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU07UUFDWCxPQUFPLElBQUksb0JBQW9CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRiJ9