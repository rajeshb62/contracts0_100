import { serializeToFields } from '@aztec/foundation/serialize';
import { CallContext } from '../call_context.js';
import { Header } from '../header.js';
import { TxContext } from '../tx_context.js';
export class PrivateContextInputs {
    constructor(callContext, historicalHeader, txContext, startSideEffectCounter) {
        this.callContext = callContext;
        this.historicalHeader = historicalHeader;
        this.txContext = txContext;
        this.startSideEffectCounter = startSideEffectCounter;
    }
    static empty() {
        return new PrivateContextInputs(CallContext.empty(), Header.empty(), TxContext.empty(), 0);
    }
    toFields() {
        return serializeToFields([this.callContext, this.historicalHeader, this.txContext, this.startSideEffectCounter]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9jb250ZXh0X2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2NvbnRleHQvcHJpdmF0ZV9jb250ZXh0X2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0MsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNTLFdBQXdCLEVBQ3hCLGdCQUF3QixFQUN4QixTQUFvQixFQUNwQixzQkFBOEI7UUFIOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFRO0lBQ3BDLENBQUM7SUFFRyxNQUFNLENBQUMsS0FBSztRQUNqQixPQUFPLElBQUksb0JBQW9CLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQ25ILENBQUM7Q0FDRiJ9