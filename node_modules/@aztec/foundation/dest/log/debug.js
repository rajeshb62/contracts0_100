import debug from 'debug';
let preLogHook;
let postLogHook;
/**
 * Process and handle the logging of messages through custom hooks and the given logger.
 * This function checks if the logger's namespace is enabled, executes any preLogHook functions, logs the message using the provided logger, and then executes any postLogHook functions.
 *
 * @param logger - The debug logger instance to be used for logging.
 * @param args - The arguments to be passed to the logger and any hook functions.
 */
function theFunctionThroughWhichAllLogsPass(logger, ...args) {
    if (!debug.enabled(logger.namespace)) {
        return;
    }
    if (preLogHook) {
        preLogHook(logger.namespace, ...args);
    }
    logger(...args);
    if (postLogHook) {
        postLogHook(logger.namespace, ...args);
    }
}
/**
 * Return a logger, meant to be silent by default and verbose during debugging.
 * @param name - The module name of the logger.
 * @returns A callable log function.
 */
export function createDebugOnlyLogger(name) {
    const logger = debug(name);
    return (...args) => theFunctionThroughWhichAllLogsPass(logger, ...args);
}
/**
 * Set a function to be called before each log message is handled by the debug logger.
 * The hook function will receive the logger namespace and any arguments passed to the logger.
 * This can be useful for adding additional context, filtering logs, or performing side-effects
 * based on logged messages.
 *
 * @param fn - The function to be called before each log message.
 */
export function setPreDebugLogHook(fn) {
    preLogHook = fn;
}
/**
 * Set a callback function to be executed after each log is written by the debug logger.
 * This allows additional behavior or side effects to occur after a log has been written,
 * such as sending logs to external services, formatting output, or triggering events.
 *
 * @param fn - The callback function to be executed after each log. It receives the same arguments as the original log function call.
 */
export function setPostDebugLogHook(fn) {
    postLogHook = fn;
}
/**
 * Enable logs for the specified namespace(s) or wildcard pattern(s).
 * This function activates the logging functionality for the given
 * namespace(s) or pattern(s), allowing developers to selectively display
 * debug logs that match the provided string(s).
 *
 * @param str - The namespace(s) or wildcard pattern(s) for which logs should be enabled.
 */
export function enableLogs(str) {
    debug.enable(str);
}
/**
 * Check if the logging is enabled for a given namespace.
 * The input 'str' represents the namespace for which the log status is being checked.
 * Returns true if the logging is enabled, otherwise false.
 *
 * @param str - The namespace string used to determine if logging is enabled.
 * @returns A boolean indicating whether logging is enabled for the given namespace.
 */
export function isLogEnabled(str) {
    return debug.enabled(str);
}
export function applyStringFormatting(formatStr, args) {
    return formatStr
        .replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] === 'undefined' ? match : args[index].toString();
    })
        .replace(/{}/g, (_match, _index) => {
        return args.toString();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9nL2RlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUkxQixJQUFJLFVBQWtELENBQUM7QUFDdkQsSUFBSSxXQUFtRCxDQUFDO0FBRXhEOzs7Ozs7R0FNRztBQUNILFNBQVMsa0NBQWtDLENBQUMsTUFBVyxFQUFFLEdBQUcsSUFBVztJQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxPQUFPO0lBQ1QsQ0FBQztJQUNELElBQUksVUFBVSxFQUFFLENBQUM7UUFDZixVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQVk7SUFDaEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsa0NBQWtDLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDakYsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsRUFBNEI7SUFDN0QsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEVBQTRCO0lBQzlELFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQVc7SUFDcEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN0QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQWFELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxTQUFpQixFQUFFLElBQWlCO0lBQ3hFLE9BQU8sU0FBUztTQUNiLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEMsT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdFLENBQUMsQ0FBQztTQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=