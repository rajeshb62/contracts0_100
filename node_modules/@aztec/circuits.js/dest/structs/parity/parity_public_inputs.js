import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class ParityPublicInputs {
    constructor(
    /** Root of the SHA256 tree. */
    shaRoot, 
    /** Root of the converted tree. */
    convertedRoot, 
    /** Root of the VK tree */
    vkTreeRoot) {
        this.shaRoot = shaRoot;
        this.convertedRoot = convertedRoot;
        this.vkTreeRoot = vkTreeRoot;
        if (shaRoot.toBuffer()[0] != 0) {
            throw new Error(`shaRoot buffer must be 31 bytes. Got 32 bytes`);
        }
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...ParityPublicInputs.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The inputs serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Creates a new ParityPublicInputs instance from the given fields.
     * @param fields - The fields to create the instance from.
     * @returns The instance.
     */
    static from(fields) {
        return new ParityPublicInputs(...ParityPublicInputs.getFields(fields));
    }
    /**
     * Extracts the fields from the given instance.
     * @param fields - The instance to get the fields from.
     * @returns The instance fields.
     */
    static getFields(fields) {
        return [fields.shaRoot, fields.convertedRoot, fields.vkTreeRoot];
    }
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new ParityPublicInputs instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ParityPublicInputs(reader.readObject(Fr), reader.readObject(Fr), Fr.fromBuffer(reader));
    }
    /**
     * Deserializes the inputs from a hex string.
     * @param str - The hex string to deserialize from.
     * @returns A new ParityPublicInputs instance.
     */
    static fromString(str) {
        return ParityPublicInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyaXR5X3B1YmxpY19pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9wYXJpdHkvcGFyaXR5X3B1YmxpY19pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RSxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCO0lBQ0UsK0JBQStCO0lBQ3hCLE9BQVc7SUFDbEIsa0NBQWtDO0lBQzNCLGFBQWlCO0lBQ3hCLDBCQUEwQjtJQUNuQixVQUFjO1FBSmQsWUFBTyxHQUFQLE9BQU8sQ0FBSTtRQUVYLGtCQUFhLEdBQWIsYUFBYSxDQUFJO1FBRWpCLGVBQVUsR0FBVixVQUFVLENBQUk7UUFFckIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBb0M7UUFDOUMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW9DO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBVSxDQUFDO0lBQzVFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGIn0=