import { ContractBase } from './contract_base.js';
/** Unsafe constructor for ContractBase that bypasses the check that the instance is registered in the wallet. */
export class UnsafeContract extends ContractBase {
    constructor(
    /** The deployed contract instance definition. */
    instance, 
    /** The Application Binary Interface for the contract. */
    artifact, 
    /** The wallet used for interacting with this contract. */
    wallet) {
        super(instance, artifact, wallet);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zYWZlX2NvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0L3Vuc2FmZV9jb250cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsaUhBQWlIO0FBQ2pILE1BQU0sT0FBTyxjQUFlLFNBQVEsWUFBWTtJQUM5QztJQUNFLGlEQUFpRDtJQUNqRCxRQUFxQztJQUNyQyx5REFBeUQ7SUFDekQsUUFBMEI7SUFDMUIsMERBQTBEO0lBQzFELE1BQWM7UUFFZCxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0YifQ==