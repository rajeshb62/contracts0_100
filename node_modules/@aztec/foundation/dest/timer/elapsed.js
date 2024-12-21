import { Timer } from './timer.js';
/**
 * Measures the elapsed execution time of a function call or promise once it is awaited.
 * @param fn - Function or promise.
 * @returns The number of ms and the result.
 */
export async function elapsed(fn) {
    const timer = new Timer();
    const result = await (typeof fn === 'function' ? fn() : fn);
    return [timer.ms(), result];
}
/**
 * Measures the elapsed execution time of a synchronous function call once it is awaited.
 * @param fn - Function.
 * @returns The number of ms and the result.
 */
export function elapsedSync(fn) {
    const timer = new Timer();
    const result = fn();
    return [timer.ms(), result];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhcHNlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lci9lbGFwc2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsT0FBTyxDQUFJLEVBQXVDO0lBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFJLEVBQVc7SUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUMxQixNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUMifQ==