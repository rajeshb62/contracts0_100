import { format } from 'util';
import { createDebugLogger } from '../../log/index.js';
/**
 * Creates a dispatch function that calls the target's specified method with provided arguments.
 * The created dispatch function takes a DispatchMsg object as input, which contains the name of
 * the method to be called ('fn') and an array of arguments to be passed to the method ('args').
 *
 * @param targetFn - A function that returns the target object containing the methods to be dispatched.
 * @param log - Optional logging function for debugging purposes.
 * @returns A dispatch function that accepts a DispatchMsg object and calls the target's method with provided arguments.
 */
export function createDispatchFn(targetFn, log = createDebugLogger('aztec:foundation:dispatch')) {
    return async ({ fn, args }) => {
        const target = targetFn();
        log.debug(format(`dispatching to ${target}: ${fn}`, args));
        return await target[fn](...args);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2Rpc3BhdGNoX2ZuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydC9kaXNwYXRjaC9jcmVhdGVfZGlzcGF0Y2hfZm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWlCdkQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsUUFBbUIsRUFBRSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsMkJBQTJCLENBQUM7SUFDeEcsT0FBTyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFlLEVBQUUsRUFBRTtRQUN6QyxNQUFNLE1BQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsTUFBTSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztBQUNKLENBQUMifQ==