import { L2Block } from '../l2_block.js';
/**
 * Checks if two objects are the same L2Block.
 *
 * Sometimes we might be comparing two L2Block instances that represent the same block but one of them might not have
 * calculated and filled its `blockHash` property (which is computed on demand). This function ensures both objects
 * are really the same L2Block.
 *
 * @param a - An object
 * @param b - Another object
 * @returns True if both a and b are the same L2Block
 */
export function equalL2Blocks(a, b) {
    const aAsL2Block = a && a instanceof L2Block ? a : undefined;
    const bAsL2Block = b && b instanceof L2Block ? b : undefined;
    if (aAsL2Block && bAsL2Block) {
        // we got two L2Block instances, so we can compare them
        // use a custom comparator because the blockHash property is lazily computed and one instance might not have it
        return aAsL2Block.toBuffer().equals(bAsL2Block.toBuffer());
    }
    else if (aAsL2Block || bAsL2Block) {
        // one value is an L2block and the other isn't. Definitely not equal.
        return false;
    }
    else {
        // we don't know what they are, tell Jest to keep looking
        return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXFfdGVzdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qZXN0L2VxX3Rlc3RlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLENBQU0sRUFBRSxDQUFNO0lBQzFDLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM3RCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFFN0QsSUFBSSxVQUFVLElBQUksVUFBVSxFQUFFLENBQUM7UUFDN0IsdURBQXVEO1FBQ3ZELCtHQUErRztRQUMvRyxPQUFPLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztTQUFNLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLHFFQUFxRTtRQUNyRSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7U0FBTSxDQUFDO1FBQ04seURBQXlEO1FBQ3pELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7QUFDSCxDQUFDIn0=