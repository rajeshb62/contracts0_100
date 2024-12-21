import { retryUntil } from '@aztec/foundation/retry';
import { createPXEClient } from '../rpc_clients/index.js';
export const getL1ContractAddresses = async (url) => {
    const pxeClient = createPXEClient(url);
    const response = await retryUntil(async () => {
        try {
            return (await pxeClient.getNodeInfo()).l1ContractAddresses;
        }
        catch (err) {
            // do nothing
        }
    }, 'isNodeReady', 120, 1);
    return response;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfY29udHJhY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2wxX2NvbnRyYWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFBRSxHQUFXLEVBQWdDLEVBQUU7SUFDeEYsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sVUFBVSxDQUMvQixLQUFLLElBQUksRUFBRTtRQUNULElBQUksQ0FBQztZQUNILE9BQU8sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1FBQzdELENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsYUFBYTtRQUNmLENBQUM7SUFDSCxDQUFDLEVBQ0QsYUFBYSxFQUNiLEdBQUcsRUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyJ9