import type { AztecAddress } from '@aztec/foundation/aztec-address';
import type { Fr } from '@aztec/foundation/fields';
export declare class ScopedValueCache<T extends {
    value: Fr;
    contractAddress: AztecAddress;
}> {
    private cache;
    constructor(items: T[]);
    get(matcher: {
        value: Fr;
        contractAddress: AztecAddress;
    }): T[];
}
//# sourceMappingURL=scoped_value_cache.d.ts.map