import { createDebugLogger } from '../../log/logger.js';
/**
 * A number generator which is used as a source of randomness in the system. If the SEED env variable is set, the
 * generator will be deterministic and will always produce the same sequence of numbers. Otherwise a true randomness
 * sourced by crypto library will be used.
 * @remarks This class was implemented so that tests can be run deterministically.
 *
 * TODO(#3949): This is not safe enough for production and should be made safer or removed before mainnet.
 */
export class RandomnessSingleton {
    constructor(seed, log = createDebugLogger('aztec:randomness_singleton')) {
        this.seed = seed;
        this.log = log;
        this.counter = 0;
        if (seed !== undefined) {
            this.log.debug(`Using pseudo-randomness with seed: ${seed}`);
            this.counter = seed;
        }
        else {
            this.log.debug('Using true randomness');
        }
    }
    static getInstance() {
        if (!RandomnessSingleton.instance) {
            const seed = process.env.SEED ? Number(process.env.SEED) : undefined;
            RandomnessSingleton.instance = new RandomnessSingleton(seed);
        }
        return RandomnessSingleton.instance;
    }
    /**
     * Indicates whether the generator is deterministic (was seeded) or not.
     * @returns Whether the generator is deterministic.
     */
    isDeterministic() {
        return this.seed !== undefined;
    }
    getBytes(length) {
        if (this.seed === undefined) {
            // Note: It would be more natural to just have the contents of randomBytes(...) function from
            // yarn-project/foundation/src/crypto/random/index.ts here but that would result in a larger
            // refactor so I think prohibiting use of this func when the seed is undefined is and handling
            // the singleton within randomBytes func is fine.
            throw new Error('RandomnessSingleton is not implemented for non-deterministic mode');
        }
        const result = Buffer.alloc(length);
        for (let i = 0; i < length; i++) {
            // Each byte of the buffer is set to a 1 byte of this.counter's value. 0xff is 255 in decimal and it's used as
            // a mask to get the last 8 bits of the shifted counter.
            result[i] = (this.counter >> (i * 8)) & 0xff;
        }
        this.counter++;
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tbmVzc19zaW5nbGV0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3JhbmRvbS9yYW5kb21uZXNzX3NpbmdsZXRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixZQUNtQixJQUFhLEVBQ2IsTUFBTSxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQztRQURyRCxTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsUUFBRyxHQUFILEdBQUcsQ0FBa0Q7UUFKaEUsWUFBTyxHQUFHLENBQUMsQ0FBQztRQU1sQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDckUsbUJBQW1CLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELE9BQU8sbUJBQW1CLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxlQUFlO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7SUFDakMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxNQUFjO1FBQzVCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1Qiw2RkFBNkY7WUFDN0YsNEZBQTRGO1lBQzVGLDhGQUE4RjtZQUM5RixpREFBaUQ7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoQyw4R0FBOEc7WUFDOUcsd0RBQXdEO1lBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiJ9