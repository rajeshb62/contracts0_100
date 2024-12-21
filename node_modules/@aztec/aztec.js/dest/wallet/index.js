import { AccountWallet } from './account_wallet.js';
export * from '../account/wallet.js';
export * from './account_wallet.js';
export * from './account_wallet_with_private_key.js';
export * from './signerless_wallet.js';
/**
 * Gets a wallet for an already registered account.
 * @param pxe - PXE Service instance.
 * @param address - Address for the account.
 * @param accountContract - Account contract implementation.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export async function getWallet(pxe, address, accountContract) {
    const completeAddress = await pxe.getRegisteredAccount(address);
    if (!completeAddress) {
        throw new Error(`Account ${address} not found`);
    }
    const nodeInfo = await pxe.getNodeInfo();
    const entrypoint = accountContract.getInterface(completeAddress, nodeInfo);
    return new AccountWallet(pxe, entrypoint);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FsbGV0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyxzQ0FBc0MsQ0FBQztBQUNyRCxjQUFjLHdCQUF3QixDQUFDO0FBRXZDOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUM3QixHQUFRLEVBQ1IsT0FBcUIsRUFDckIsZUFBZ0M7SUFFaEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxHQUFHLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxPQUFPLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRSxPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM1QyxDQUFDIn0=