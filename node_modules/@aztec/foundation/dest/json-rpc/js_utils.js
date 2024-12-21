// Make sure this property was not inherited
/**
 * Does this own the property?
 * @param obj - An object.
 * @param method - A property name.
 */
export const hasOwnProperty = (obj, propertyName) => Object.prototype.hasOwnProperty.call(obj, propertyName);
/**
 * Helper function to assert a condition is truthy
 * @param x - A boolean condition to assert.
 * @param err - Error message to throw if x isn't met.
 */
export function assert(x, err) {
    if (!x) {
        throw new Error(err);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanNvbi1ycGMvanNfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFRLEVBQUUsWUFBb0IsRUFBRSxFQUFFLENBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFMUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxNQUFNLENBQUMsQ0FBTSxFQUFFLEdBQVc7SUFDeEMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0FBQ0gsQ0FBQyJ9