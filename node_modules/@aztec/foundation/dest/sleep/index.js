import { InterruptError } from '../error/index.js';
/**
 * InterruptibleSleep is a utility class that allows you to create an interruptible sleep function.
 * The sleep function can be interrupted at any time by calling the `interrupt` method, which can
 * also specify whether the sleep should throw an error or just return. This is useful when you need
 * to terminate long-running processes or perform cleanup tasks in response to external events.
 *
 * @example
 * const sleeper = new InterruptibleSleep();
 *
 * async function longRunningTask() \{
 *   try \{
 *     await sleeper.sleep(3000);
 *     console.log('Task completed after 3 seconds');
 *   \} catch (e) \{
 *     console.log('Task was interrupted');
 *   \}
 * \}
 *
 * setTimeout(() =\> sleeper.interrupt(true), 1500); // Interrupt the sleep after 1.5 seconds
 */
export class InterruptibleSleep {
    constructor() {
        this.interrupts = [];
    }
    /**
     * Sleep for a specified amount of time in milliseconds.
     * The sleep function will pause the execution of the current async function
     * for the given time period, allowing other tasks to run before resuming.
     *
     * @param ms - The number of milliseconds to sleep.
     * @returns A Promise that resolves after the specified time has passed.
     */
    async sleep(ms) {
        let interruptResolve;
        const interruptPromise = new Promise(resolve => {
            interruptResolve = resolve;
            this.interrupts.push(resolve);
        });
        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(false), ms));
        const shouldThrow = await Promise.race([interruptPromise, timeoutPromise]);
        this.interrupts = this.interrupts.filter(res => res !== interruptResolve);
        if (shouldThrow) {
            throw new InterruptError('Interrupted.');
        }
    }
    /**
     * Interrupts the current sleep operation and optionally throws an error if specified.
     * By default, when interrupted, the sleep operation will resolve without throwing.
     * If 'sleepShouldThrow' is set to true, the sleep operation will throw an InterruptError instead.
     *
     * @param sleepShouldThrow - A boolean value indicating whether the sleep operation should throw an error when interrupted. Default is false.
     */
    interrupt(sleepShouldThrow = false) {
        this.interrupts.forEach(resolve => resolve(sleepShouldThrow));
        this.interrupts = [];
    }
}
/**
 * Puts the current execution context to sleep for a specified duration.
 * This simulates a blocking sleep operation by using an asynchronous function and a Promise that resolves after the given duration.
 * The sleep function can be interrupted by the 'interrupt' method of the InterruptibleSleep class.
 *
 * @param ms - The duration in milliseconds for which the sleep operation should last.
 * @param returnValue - The return value of the promise.
 * @returns A Promise that resolves after the specified duration, allowing the use of 'await' to pause execution.
 */
export function sleep(ms, returnValue) {
    return new Promise(resolve => setTimeout(() => resolve(returnValue), ms));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2xlZXAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQUEvQjtRQUNVLGVBQVUsR0FBMEMsRUFBRSxDQUFDO0lBc0NqRSxDQUFDO0lBcENDOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQVU7UUFDM0IsSUFBSSxnQkFBZ0QsQ0FBQztRQUNyRCxNQUFNLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFVLE9BQU8sQ0FBQyxFQUFFO1lBQ3RELGdCQUFnQixHQUFHLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLElBQUksT0FBTyxDQUFVLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFM0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTFFLElBQUksV0FBVyxFQUFFLENBQUM7WUFDaEIsTUFBTSxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUksRUFBVSxFQUFFLFdBQWU7SUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDIn0=