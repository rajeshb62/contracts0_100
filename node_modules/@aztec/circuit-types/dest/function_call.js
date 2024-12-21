import { AztecAddress } from '@aztec/circuits.js';
import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
/** A request to call a function on a contract from a given address. */
export class FunctionCall {
    constructor(
    /** The name of the function to call */
    name, 
    /** The recipient contract */
    to, 
    /** The function being called */
    selector, 
    /** Type of the function */
    type, 
    /** Whether this call can make modifications to state or not */
    isStatic, 
    /** The encoded args */
    args, 
    /** The return type for decoding */
    returnTypes) {
        this.name = name;
        this.to = to;
        this.selector = selector;
        this.type = type;
        this.isStatic = isStatic;
        this.args = args;
        this.returnTypes = returnTypes;
    }
    static getFields(fields) {
        return [
            fields.name,
            fields.to,
            fields.selector,
            fields.type,
            fields.isStatic,
            fields.args,
            fields.returnTypes,
        ];
    }
    static from(fields) {
        return new FunctionCall(...FunctionCall.getFields(fields));
    }
    /**
     * Creates an empty function call.
     * @returns an empty function call.
     */
    static empty() {
        return {
            name: '',
            to: AztecAddress.ZERO,
            selector: FunctionSelector.empty(),
            type: FunctionType.PUBLIC,
            isStatic: false,
            args: [],
            returnTypes: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fY2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mdW5jdGlvbl9jYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQWdCLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3JGLHVFQUF1RTtBQUN2RSxNQUFNLE9BQU8sWUFBWTtJQUN2QjtJQUNFLHVDQUF1QztJQUNoQyxJQUFZO0lBQ25CLDZCQUE2QjtJQUN0QixFQUFnQjtJQUN2QixnQ0FBZ0M7SUFDekIsUUFBMEI7SUFDakMsMkJBQTJCO0lBQ3BCLElBQWtCO0lBQ3pCLCtEQUErRDtJQUN4RCxRQUFpQjtJQUN4Qix1QkFBdUI7SUFDaEIsSUFBVTtJQUNqQixtQ0FBbUM7SUFDNUIsV0FBc0I7UUFadEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUVaLE9BQUUsR0FBRixFQUFFLENBQWM7UUFFaEIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFFMUIsU0FBSSxHQUFKLElBQUksQ0FBYztRQUVsQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRWpCLFNBQUksR0FBSixJQUFJLENBQU07UUFFVixnQkFBVyxHQUFYLFdBQVcsQ0FBVztJQUM1QixDQUFDO0lBRUosTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUE4QjtRQUM3QyxPQUFPO1lBQ0wsTUFBTSxDQUFDLElBQUk7WUFDWCxNQUFNLENBQUMsRUFBRTtZQUNULE1BQU0sQ0FBQyxRQUFRO1lBQ2YsTUFBTSxDQUFDLElBQUk7WUFDWCxNQUFNLENBQUMsUUFBUTtZQUNmLE1BQU0sQ0FBQyxJQUFJO1lBQ1gsTUFBTSxDQUFDLFdBQVc7U0FDVixDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBOEI7UUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTztZQUNMLElBQUksRUFBRSxFQUFFO1lBQ1IsRUFBRSxFQUFFLFlBQVksQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7WUFDbEMsSUFBSSxFQUFFLFlBQVksQ0FBQyxNQUFNO1lBQ3pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=