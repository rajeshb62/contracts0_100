/**
 * Create an array over an integer range.
 * @param n - The number of integers.
 * @param offset - The starting number.
 * @returns The array of numbers.
 */
export function range(n, offset = 0) {
    const ret = [];
    for (let i = 0; i < n; i++) {
        ret.push(offset + i);
    }
    return ret;
}
/**
 * Create an array over an integer range, filled with a function 'fn'.
 * This is used over e.g. lodash because it resolved to a tuple type, needed for our fixed array type safety.
 * @param n - The number of integers.
 * @param fn - The generator function.
 * @returns The array of numbers.
 */
export function makeTuple(length, fn, offset = 0) {
    return Array.from({ length }, (_, i) => fn(i + offset));
}
/**
 * Create an array over an integer range, filled with a function 'fn'. However, the latter half of the array are set to zeros.
 * see `makeTuple` above.
 * @param n - The number of integers.
 * @param fn - The generator function.
 * @returns The array of numbers.
 */
export function makeHalfFullTuple(length, fn, offset = 0, makeEmpty) {
    return Array.from({ length }, (_, i) => (i < length / 2 ? fn(i + offset) : makeEmpty()));
}
/**
 * Assert a member of an object is a certain length.
 * @param obj - An object.
 * @param member - A member string.
 * @param length - The length.
 */
export function assertMemberLength(obj, member, length) {
    if (obj[member].length !== length) {
        throw new Error(`Expected ${member} to have length ${length} but was ${obj[member].length}`);
    }
}
/**
 * Assert all subarrays in a member of an object are a certain length.
 * @param obj - An object.
 * @param member - A member string.
 * @param length - The expected length for each subarray.
 */
export function assertItemsLength(obj, member, length) {
    const arrays = obj[member];
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length !== length) {
            throw new Error(`Expected ${member}[${i}] to have length ${length} but was ${arrays[i].length}`);
        }
    }
}
/**
 * Checks that the permutation is valid. Throws an error if it is not.
 * @param original - The original array.
 * @param permutation - The array which is allegedly a permutation of the original.
 * @param indexes - The indices of the original array which the permutation should map to.
 * @param isEqual - A function to compare the elements of the original and permutation arrays.
 */
export function assertPermutation(original, permutation, indexes, isEqual) {
    if (original.length !== permutation.length || original.length !== indexes.length) {
        throw new Error(`Invalid lengths: ${original.length}, ${permutation.length}, ${indexes.length}`);
    }
    const seenValue = new Set();
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const permutedValue = permutation[i];
        const originalValueAtIndex = original[index];
        if (!isEqual(permutedValue, originalValueAtIndex)) {
            throw new Error(`Invalid permutation at index ${index}: ${permutedValue} !== ${originalValueAtIndex}`);
        }
        if (seenValue.has(index)) {
            throw new Error(`Duplicate index in permutation: ${index}`);
        }
        seenValue.add(index);
    }
}
export function assertRightPadded(arr, isEmpty) {
    let seenEmpty = false;
    for (let i = 0; i < arr.length; i++) {
        if (isEmpty(arr[i])) {
            seenEmpty = true;
        }
        else if (seenEmpty) {
            throw new Error(`Non-empty element at index [${i}] after empty element`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXJyYXkvYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsS0FBSyxDQUFDLENBQVMsRUFBRSxNQUFNLEdBQUcsQ0FBQztJQUN6QyxNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7SUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUFzQixNQUFTLEVBQUUsRUFBb0IsRUFBRSxNQUFNLEdBQUcsQ0FBQztJQUN4RixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQU0sRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQWdCLENBQUM7QUFDdEYsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsTUFBUyxFQUNULEVBQW9CLEVBQ3BCLE1BQU0sR0FBRyxDQUFDLEVBQ1YsU0FBa0I7SUFFbEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFNLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFnQixDQUFDO0FBQ3ZILENBQUM7QUFFRDs7Ozs7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