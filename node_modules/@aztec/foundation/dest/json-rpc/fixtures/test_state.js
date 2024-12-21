import { sleep } from '../../sleep/index.js';
/**
 * Contrived example for JSON RPC tests.
 */
export class TestNote {
    constructor(data) {
        this.data = data;
    }
    /**
     * Create a string representation of this class.
     * @returns The string representation.
     */
    toString() {
        return this.data;
    }
    /**
     * Creates a string representation of this class.
     * @param data - The data.
     * @returns The string representation.
     */
    static fromString(data) {
        return new TestNote(data);
    }
}
/**
 * Represents a simple state management for TestNote instances.
 * Provides functionality to get a note by index and add notes asynchronously.
 * Primarily used for testing JSON RPC-related functionalities.
 */
export class TestState {
    constructor(notes) {
        this.notes = notes;
    }
    /**
     * Retrieve the TestNote instance at the specified index from the notes array.
     * This method allows getting a desired TestNote from the collection of notes
     * maintained by the TestState instance using the provided index value.
     *
     * @param index - The index of the TestNote to be retrieved from the notes array.
     * @returns The TestNote instance corresponding to the given index.
     */
    getNote(index) {
        return this.notes[index];
    }
    /**
     * Add an array of TestNote instances to the current TestState's notes.
     * This function simulates asynchronous behavior by waiting for a duration
     * equal to the number of notes being added. It then returns the updated
     * list of TestNote instances in the TestState.
     *
     * @param notes - An array of TestNote instances to be added.
     * @returns A Promise that resolves to an array of TestNote instances, including the newly added notes.
     */
    async addNotes(notes) {
        for (const note of notes) {
            this.notes.push(note);
        }
        await sleep(notes.length);
        return this.notes;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qc29uLXJwYy9maXh0dXJlcy90ZXN0X3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBQ25CLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUNwQzs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBQ3BCLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7SUFBRyxDQUFDO0lBQ3pDOzs7Ozs7O09BT0c7SUFDSCxPQUFPLENBQUMsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFpQjtRQUM5QixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRiJ9