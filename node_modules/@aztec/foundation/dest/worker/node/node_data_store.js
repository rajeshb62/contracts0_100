import leveldown from 'leveldown';
import levelup from 'levelup';
import memdown from 'memdown';
/**
 * Cache for data used by wasm module.
 */
export class NodeDataStore {
    // eslint-disable-next-line
    constructor(path) {
        // Hack: Cast as any to work around packages "broken" with node16 resolution
        // See https://github.com/microsoft/TypeScript/issues/49160
        this.db = levelup(path ? leveldown(path) : memdown());
    }
    async get(key) {
        return await this.db.get(key).catch(() => { });
    }
    async set(key, value) {
        await this.db.put(key, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9kYXRhX3N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3dvcmtlci9ub2RlL25vZGVfZGF0YV9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxPQUF5QixNQUFNLFNBQVMsQ0FBQztBQUNoRCxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFJOUI7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUd4QiwyQkFBMkI7SUFDM0IsWUFBWSxJQUFhO1FBQ3ZCLDRFQUE0RTtRQUM1RSwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxTQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBRSxPQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDbkIsT0FBTyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUNsQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0YifQ==