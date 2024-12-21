/**
 * LogHistory is a utility class that provides the ability to store and manage debug logs.
 * It can be enabled to record logs along with their timestamps, retrieve a specified number
 * of recent logs, or clear stored logs based on a given count. This can be useful for debugging
 * purposes, monitoring application activities, and maintaining log history.
 */
export declare class LogHistory {
    private logs;
    /**
     * Enables the logging of debug messages with timestamps.
     * Hooks into the pre-debug log and stores each log entry along with its timestamp in the logs array.
     */
    enable(): void;
    /**
     * Retrieves a specified number of logs from the end of the log history or all logs if no argument is provided.
     * The logs are ordered chronologically, with the oldest logs at the beginning of the array.
     *
     * @param last - Optional number representing the amount of recent logs to return. Defaults to 0, which returns all logs.
     * @returns An array of log arrays, each containing a timestamp and log arguments.
     */
    getLogs(last?: number): any[][];
    /**
     * Clear a specified number of logs from the beginning of the logs array.
     * If no count is provided, it will clear all logs.
     *
     * @param count - The number of logs to be removed (default: total logs length).
     */
    clear(count?: number): void;
}
export declare const logHistory: LogHistory;
//# sourceMappingURL=log_history.d.ts.map