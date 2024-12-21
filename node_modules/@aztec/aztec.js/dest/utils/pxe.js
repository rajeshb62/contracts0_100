import { retryUntil } from '@aztec/foundation/retry';
export const waitForPXE = async (pxe, logger) => {
    await retryUntil(async () => {
        try {
            logger?.debug('Attempting to contact PXE...');
            await pxe.getNodeInfo();
            return true;
        }
        catch (error) {
            logger?.verbose('Failed to contact PXE');
        }
        return undefined;
    }, 'RPC Get Node Info');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHhlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3B4ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFRLEVBQUUsTUFBb0IsRUFBRSxFQUFFO0lBQ2pFLE1BQU0sVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzFCLElBQUksQ0FBQztZQUNILE1BQU0sRUFBRSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM5QyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMifQ==