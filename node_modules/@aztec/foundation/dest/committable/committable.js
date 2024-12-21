/**
 * A class that allows for a value to be committed or rolled back.
 */
export class Committable {
    constructor(initialValue) {
        this.nextValue = undefined;
        this.currentValue = initialValue;
    }
    /**
     * Commits the uncommitted value.
     */
    commit() {
        if (this.nextValue === undefined) {
            return;
        }
        this.currentValue = this.nextValue;
        this.nextValue = undefined;
    }
    /**
     * Rolls back the uncommitted value.
     */
    rollback() {
        this.nextValue === undefined;
    }
    /**
     * Gets the current value.
     * @param includeUncommitted - Whether to include the uncommitted value.
     * @returns The current value if includeUncommitted is false, otherwise the uncommitted value.
     */
    get(includeUncommitted = false) {
        return includeUncommitted && this.nextValue ? this.nextValue : this.currentValue;
    }
    /**
     * Sets the next value to be committed to.
     * @param value - The new value to be set.
     */
    set(value) {
        this.nextValue = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0dGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWl0dGFibGUvY29tbWl0dGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sV0FBVztJQUl0QixZQUFZLFlBQWU7UUFGbkIsY0FBUyxHQUFrQixTQUFTLENBQUM7UUFHM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxPQUFPO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxHQUFHLENBQUMscUJBQThCLEtBQUs7UUFDNUMsT0FBTyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ25GLENBQUM7SUFFRDs7O09BR0c7SUFDSSxHQUFHLENBQUMsS0FBUTtRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0NBQ0YifQ==