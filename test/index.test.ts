import {
    AccountWallet,
    CompleteAddress,
    ContractDeployer,
    createDebugLogger,
    Fr,
    waitForPXE,
    TxStatus,
    createPXEClient,
    getContractInstanceFromDeployParams,
    Contract,
    GrumpkinScalar,
    PXE,
    DebugLogger,
    AztecAddress,
  } from "@aztec/aztec.js";
  import {
    PrivateGroupsContractArtifact,
    PrivateGroupsContract,
  } from "../src/circuits/src/artifacts/PrivateGroups";
  import { setupSandbox, createAccount } from "./utils";

  describe("PrivateGroups", () => {
    let pxe: PXE;
    let wallets: AccountWallet[] = [];
    let accounts: CompleteAddress[] = [];
    let addresses: string[] = [];
    let logger: DebugLogger;
    
    //Contract
    let private_group_contract: Contract;
    
    //Member Wallets
    let adminWallet: AccountWallet;
    let aliceWallet: AccountWallet;
    let bobWallet: AccountWallet;
    
    //Member addresses
    let adminAddress: AztecAddress;
    let aliceAddress: AztecAddress;
    let bobAddress: AztecAddress;
    
    //ContractInstances
    let adminInstance: PrivateGroupsContract;
    let aliceInstance: PrivateGroupsContract;
    let bobInstance: PrivateGroupsContract;
  
  beforeAll(async () => {
      logger = createDebugLogger("aztec:PrivateGroups");
      logger.info("Aztec-PrivateGroups tests running");
  
      // Setup PXE
      pxe = await setupSandbox();
      const GroupsArtifact = PrivateGroupsContractArtifact;
      console.log("GroupsArtifact");
  
      // Create admin, Alice, and Bob wallets
      adminWallet = await createAccount(pxe);
      aliceWallet = await createAccount(pxe);
      bobWallet = await createAccount(pxe);
      console.log("wallets created");
  
      // Store wallets
      wallets = [adminWallet, aliceWallet, bobWallet];
  
      // Store complete addresses
      accounts = [
        adminWallet.getCompleteAddress(),
        aliceWallet.getCompleteAddress(),
        bobWallet.getCompleteAddress(),
      ];
      console.log("accounts created");
  
      // Store just the wallet addresses
      addresses = [
        adminWallet.getCompleteAddress().address.toString(),
        aliceWallet.getCompleteAddress().address.toString(),
        bobWallet.getCompleteAddress().address.toString(),
      ];
      console.log("addresses", addresses);
  
      // Deploy contract with admin address
      adminAddress = adminWallet.getCompleteAddress().address;
      aliceAddress = aliceWallet.getCompleteAddress().address;
      bobAddress = bobWallet.getCompleteAddress().address;
      console.log("addresses", addresses);
  
      private_group_contract = await Contract.deploy(
        adminWallet,
        GroupsArtifact,
        [adminAddress, [adminAddress, aliceAddress, bobAddress]]
      )
        .send()
        .deployed();
      console.log("contract deployed");
    });

    it("should have added all members to group", async () => {
        adminInstance = await PrivateGroupsContract.at(
          private_group_contract.address,
          adminWallet
        );
    
        //assume we are impersonating the admin
        let getMembers = await adminInstance.methods
          .get_group_members(adminAddress)
          .simulate();
        expect(getMembers).toEqual([adminAddress, aliceAddress, bobAddress]);
      }, 300_000);

      it("sets the balance for admin and alice", async () => {
        const setBalance = await adminInstance.methods
          .set_balance(adminAddress, aliceAddress, 100)
          .send()
          .wait();
        console.log("setBalance", setBalance);
    
        const getBalance = await adminInstance.methods
          .read_balance_credit(adminAddress, aliceAddress)
          .simulate();
        console.log("getBalance", getBalance);
        expect(getBalance).toBe(100n);
       });