import { inspect } from 'util';
import { toBufferBE } from '../bigint-buffer/index.js';
import { Fr } from '../fields/index.js';
/** A selector is the first 4 bytes of the hash of a signature. */
export class Selector {
    constructor(/** Value of the selector */ value) {
        this.value = value;
        if (value > 2 ** (Selector.SIZE * 8) - 1) {
            throw new Error(`Selector must fit in ${Selector.SIZE} bytes (got value ${value}).`);
        }
    }
    /**
     * Checks if the selector is empty (all bytes are 0).
     * @returns True if the selector is empty (all bytes are 0).
     */
    isEmpty() {
        return this.value === 0;
    }
    /**
     * Serialize as a buffer.
     * @param bufferSize - The buffer size.
     * @returns The buffer.
     */
    toBuffer(bufferSize = Selector.SIZE) {
        return toBufferBE(BigInt(this.value), bufferSize);
    }
    /**
     * Serialize as a hex string.
     * @returns The string.
     */
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    [inspect.custom]() {
        return `Selector<${this.toString()}>`;
    }
    /**
     * Checks if this selector is equal to another.
     * @param other - The other selector.
     * @returns True if the selectors are equal.
     */
    equals(other) {
        return this.value === other.value;
    }
    /**
     * Returns a new field with the same contents as this EthAddress.
     *
     * @returns An Fr instance.
     */
    toField() {
        return new Fr(BigInt(this.value));
    }
}
/** The size of the selector in bytes. */
Selector.SIZE = 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJpL3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4QyxrRUFBa0U7QUFDbEUsTUFBTSxPQUFnQixRQUFRO0lBSTVCLFlBQVksNEJBQTRCLENBQVEsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDM0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixRQUFRLENBQUMsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN2RixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSTtRQUNqQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2QsT0FBTyxZQUFZLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7QUF0REQseUNBQXlDO0FBQzNCLGFBQUksR0FBRyxDQUFDLENBQUMifQ==