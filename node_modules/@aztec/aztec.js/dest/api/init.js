import { init } from '@aztec/foundation/crypto';
/**
 * This should only be needed to be called in CJS environments that don't have top level await.
 * Initializes any asynchronous subsystems required to use the library.
 * At time of writing, this is just our foundation crypto lib.
 */
export async function initAztecJs() {
    await init();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVztJQUMvQixNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyJ9