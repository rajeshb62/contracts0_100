import { setPreDebugLogHook } from './debug.js';
/**
 * LogHistory is a utility class that provides the ability to store and manage debug logs.
 * It can be enabled to record logs along with their timestamps, retrieve a specified number
 * of recent logs, or clear stored logs based on a given count. This can be useful for debugging
 * purposes, monitoring application activities, and maintaining log history.
 */
export class LogHistory {
    constructor() {
        this.logs = [];
    }
    /**
     * Enables the logging of debug messages with timestamps.
     * Hooks into the pre-debug log and stores each log entry along with its timestamp in the logs array.
     */
    enable() {
        setPreDebugLogHook((...args) => {
            this.logs.push([new Date().toISOString(), ...args]);
        });
    }
    /**
     * Retrieves a specified number of logs from the end of the log history or all logs if no argument is provided.
     * The logs are ordered chronologically, with the oldest logs at the beginning of the array.
     *
     * @param last - Optional number representing the amount of recent logs to return. Defaults to 0, which returns all logs.
     * @returns An array of log arrays, each containing a timestamp and log arguments.
     */
    getLogs(last = 0) {
        return last ? this.logs.slice(-last) : this.logs;
    }
    /**
     * Clear a specified number of logs from the beginning of the logs array.
     * If no count is provided, it will clear all logs.
     *
     * @param count - The number of logs to be removed (default: total logs length).
     */
    clear(count = this.logs.length) {
        this.logs = this.logs.slice(count);
    }
}
export const logHistory = new LogHistory();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nX2hpc3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9nL2xvZ19oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVoRDs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBQ1UsU0FBSSxHQUFZLEVBQUUsQ0FBQztJQWdDN0IsQ0FBQztJQTlCQzs7O09BR0c7SUFDSSxNQUFNO1FBQ1gsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMifQ==