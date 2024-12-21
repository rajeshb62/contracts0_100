import { AztecAddress } from '@aztec/circuits.js';
/**
 * Does not pay fees. Will work until we enforce fee payment for all txs.
 */
export class NoFeePaymentMethod {
    constructor() { }
    getAsset() {
        return AztecAddress.ZERO;
    }
    getFunctionCalls() {
        return Promise.resolve([]);
    }
    getFeePayer() {
        return Promise.resolve(AztecAddress.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9fZmVlX3BheW1lbnRfbWV0aG9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZlZS9ub19mZWVfcGF5bWVudF9tZXRob2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSWxEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixnQkFBZSxDQUFDO0lBRWhCLFFBQVE7UUFDTixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGIn0=