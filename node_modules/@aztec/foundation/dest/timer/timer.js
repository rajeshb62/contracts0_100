/**
 * Timer class to measure time intervals in milliseconds and seconds.
 * Upon instantiation, it stores the current timestamp as the starting point.
 * The 'ms()' method returns the elapsed time in milliseconds,
 * while the 's()' method returns the elapsed time in seconds.
 *
 * @example
 * const timer = new Timer();
 * setTimeout(() =\> \{
 *   console.log(`Elapsed time: ${timer.ms()} ms`);
 * \}, 1000);
 */
export class Timer {
    constructor() {
        this.start = performance ? performance.now() : Date.now();
    }
    /**
     * Return microseconds.
     */
    us() {
        return this.ms() * 1000;
    }
    /**
     * Returns the elapsed time in milliseconds since the Timer instance was created.
     * Provides a simple and convenient way to measure the time duration between two events
     * or monitor performance of specific code sections.
     *
     * @returns The elapsed time in milliseconds.
     */
    ms() {
        return (performance ? performance.now() : Date.now()) - this.start;
    }
    /**
     * Returns the time elapsed since the Timer instance was created, in seconds.
     * The value is calculated by subtracting the initial start time from the current time
     * and dividing the result by 1000 to convert milliseconds to seconds.
     *
     * @returns The elapsed time in seconds.
     */
    s() {
        return this.ms() / 1000;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGltZXIvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLE9BQU8sS0FBSztJQUdoQjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxFQUFFO1FBQ1AsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxFQUFFO1FBQ1AsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxDQUFDO1FBQ04sT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Q0FDRiJ9