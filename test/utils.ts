import {
    AztecAddress,
    createPXEClient,
    deriveMasterIncomingViewingSecretKey,
    Fr,
    GrumpkinScalar,
    PXE,
    Schnorr,
  } from "@aztec/aztec.js";
  import { SingleKeyAccountContract } from "@aztec/accounts/single_key";
  import { AccountManager, AccountWalletWithSecretKey } from "@aztec/aztec.js";
  import { waitForPXE } from "@aztec/aztec.js";
  
  export const setupSandbox = async () => {
    const { PXE_URL = "<http://localhost:8080>" } = process.env;
    const pxe = createPXEClient(PXE_URL);
    await waitForPXE(pxe);
    return pxe;
  };
  
  export const createAccount = async (pxe: PXE) => {
    // Generate a new secret key for each wallet
    const secretKey = Fr.random();
    const encryptionPrivateKey = deriveMasterIncomingViewingSecretKey(secretKey);
    const accountContract = new SingleKeyAccountContract(encryptionPrivateKey);
    // Create a new AccountManager instance
    const account = new AccountManager(pxe, secretKey, accountContract);
    // Register the account and get the wallet
    const wallet = await account.register(); // Returns AccountWalletWithSecretKey
    return wallet;
  };