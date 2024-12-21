import { AccountWallet } from './account_wallet.js';
/**
 * Extends {@link AccountWallet} with the encryption private key. Not required for
 * implementing the wallet interface but useful for testing purposes or exporting
 * an account to another pxe.
 */
export class AccountWalletWithSecretKey extends AccountWallet {
    constructor(pxe, account, secretKey, 
    /** Deployment salt for this account contract. */
    salt) {
        super(pxe, account);
        this.secretKey = secretKey;
        this.salt = salt;
    }
    /** Returns the encryption private key associated with this account. */
    getSecretKey() {
        return this.secretKey;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF93YWxsZXRfd2l0aF9wcml2YXRlX2tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93YWxsZXQvYWNjb3VudF93YWxsZXRfd2l0aF9wcml2YXRlX2tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxhQUFhO0lBQzNELFlBQ0UsR0FBUSxFQUNSLE9BQXlCLEVBQ2pCLFNBQWE7SUFDckIsaURBQWlEO0lBQ2pDLElBQVU7UUFFMUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUpaLGNBQVMsR0FBVCxTQUFTLENBQUk7UUFFTCxTQUFJLEdBQUosSUFBSSxDQUFNO0lBRzVCLENBQUM7SUFFRCx1RUFBdUU7SUFDaEUsWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztDQUNGIn0=