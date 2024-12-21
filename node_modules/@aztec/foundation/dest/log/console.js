/**
 * ConsoleLogger is a utility class that provides customizable console logging functionality.
 * It allows setting a custom prefix for log messages and an optional custom logger function,
 * which can be useful for controlling the format of the output or redirecting logs to a different destination.
 */
class ConsoleLogger {
    constructor(prefix, logger = console.log) {
        this.prefix = prefix;
        this.logger = logger;
    }
    /**
     * Log messages with the specified prefix using the provided logger.
     * By default, it uses 'console.log' as the logger but can be overridden
     * during ConsoleLogger instantiation. This method allows for easy
     * organization and readability of log messages in the console.
     *
     * @param args - The data to be logged, any number of arguments can be passed to this function.
     */
    log(...args) {
        this.logger(`${this.prefix}:`, ...args);
    }
}
/**
 * Creates a Logger function with an optional prefix for log messages.
 * If a prefix is provided, the created logger will prepend it to each log message.
 * If no prefix is provided, the default console.log will be returned.
 *
 * @param prefix - The optional string to prepend to each log message.
 * @returns A Logger function that accepts any number of arguments and logs them with the specified prefix.
 */
export function createConsoleLogger(prefix) {
    if (prefix) {
        const logger = new ConsoleLogger(prefix, console.log);
        return (...args) => logger.log(...args);
    }
    return console.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvY29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTs7OztHQUlHO0FBQ0gsTUFBTSxhQUFhO0lBQ2pCLFlBQW9CLE1BQWMsRUFBVSxTQUFtQyxPQUFPLENBQUMsR0FBRztRQUF0RSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBd0M7SUFBRyxDQUFDO0lBRTlGOzs7Ozs7O09BT0c7SUFDSSxHQUFHLENBQUMsR0FBRyxJQUFXO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE1BQWU7SUFDakQsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNYLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNyQixDQUFDIn0=