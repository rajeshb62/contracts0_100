export * from './mutex_database.js';
/**
 * Mutex class provides a mutual exclusion mechanism for critical sections of code using a named lock.
 * The lock is acquired and released via the `lock` and `unlock` methods. Locks can be optionally pinged
 * to keep them alive when they are held for longer durations, avoiding unintended release due to timeouts.
 *
 * The underlying lock state is managed in a MutexDatabase instance which can be shared across multiple Mutex instances.
 * This allows for synchronization between different parts of an application or even across different instances of an application.
 *
 * @example
 * const mutex = new Mutex(mutexDatabase, 'myLock');
 * await mutex.lock();
 * // Critical section here
 * await mutex.unlock();
 */
export class Mutex {
    constructor(db, name, timeout = 5000, tryLockInterval = 2000, pingInterval = 2000) {
        this.db = db;
        this.name = name;
        this.timeout = timeout;
        this.tryLockInterval = tryLockInterval;
        this.pingInterval = pingInterval;
        this.id = 0;
    }
    /**
     * Acquire a lock on the mutex. If 'untilAcquired' is true, the method will keep trying to acquire the lock until it
     * successfully acquires it. If 'untilAcquired' is false, the method will try to acquire the lock once and return
     * immediately with a boolean indicating if the lock has been acquired or not.
     *
     * @param untilAcquired - Optional parameter, set to true by default. If true, the method will keep trying to acquire the lock until success. If false, the method will try only once and return a boolean value.
     * @returns A Promise that resolves to true if the lock has been acquired, or false when 'untilAcquired' is false and the lock could not be immediately acquired.
     */
    async lock(untilAcquired = true) {
        while (true) {
            if (await this.db.acquireLock(this.name, this.timeout)) {
                const id = this.id;
                this.pingTimeout = setTimeout(() => this.ping(id), this.pingInterval);
                return true;
            }
            if (!untilAcquired) {
                return false;
            }
            await new Promise(resolve => setTimeout(resolve, this.tryLockInterval));
        }
    }
    /**
     * Unlocks the mutex, allowing other instances to acquire the lock.
     * This method also clears the internal ping timeout and increments the internal ID
     * to ensure stale pings do not extend the lock after it has been released.
     *
     * @returns A promise that resolves once the lock has been released in the database.
     */
    async unlock() {
        clearTimeout(this.pingTimeout);
        this.id++;
        await this.db.releaseLock(this.name);
    }
    /**
     * Periodically extends the lock's lifetime by updating the database record with a new expiration time.
     * This method is called recursively using setTimeout. If the id passed to the ping method does not match
     * the current lock instance's id, it means the lock has been released or acquired by another instance
     * and the ping should not proceed further.
     *
     * @param id - The id of the current lock instance.
     */
    async ping(id) {
        if (id !== this.id) {
            return;
        }
        await this.db.extendLock(this.name, this.timeout);
        this.pingTimeout = setTimeout(() => this.ping(id), this.pingInterval);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbXV0ZXgvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsY0FBYyxxQkFBcUIsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxPQUFPLEtBQUs7SUFJaEIsWUFDbUIsRUFBaUIsRUFDakIsSUFBWSxFQUNaLFVBQVUsSUFBSSxFQUNkLGtCQUFrQixJQUFJLEVBQ3RCLGVBQWUsSUFBSTtRQUpuQixPQUFFLEdBQUYsRUFBRSxDQUFlO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixZQUFPLEdBQVAsT0FBTyxDQUFPO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQU87UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQU87UUFSOUIsT0FBRSxHQUFHLENBQUMsQ0FBQztJQVNaLENBQUM7SUFFSjs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSTtRQUNwQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztZQUNELE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLE1BQU07UUFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDVixNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBVTtRQUMzQixJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkIsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRiJ9