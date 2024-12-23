
/* Autogenerated file, do not edit! */

/* eslint-disable */
import {
  type AbiType,
  AztecAddress,
  type AztecAddressLike,
  CompleteAddress,
  Contract,
  type ContractArtifact,
  ContractBase,
  ContractFunctionInteraction,
  type ContractInstanceWithAddress,
  type ContractMethod,
  type ContractStorageLayout,
  type ContractNotes,
  decodeFromAbi,
  DeployMethod,
  EthAddress,
  type EthAddressLike,
  EventSelector,
  type FieldLike,
  Fr,
  type FunctionSelectorLike,
  L1EventPayload,
  loadContractArtifact,
  type NoirCompiledContract,
  NoteSelector,
  Point,
  type PublicKey,
  PublicKeys,
  type UnencryptedL2Log,
  type Wallet,
  type WrappedFieldLike,
} from '@aztec/aztec.js';
import PrivateGroupsContractArtifactJson from '../../target/circuits-PrivateGroups.json' assert { type: 'json' };
export const PrivateGroupsContractArtifact = loadContractArtifact(PrivateGroupsContractArtifactJson as unknown as NoirCompiledContract);



/**
 * Type-safe interface for contract PrivateGroups;
 */
export class PrivateGroupsContract extends ContractBase {
  
  private constructor(
    instance: ContractInstanceWithAddress,
    wallet: Wallet,
  ) {
    super(instance, PrivateGroupsContractArtifact, wallet);
  }
  

  
  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(
    address: AztecAddress,
    wallet: Wallet,
  ) {
    return Contract.at(address, PrivateGroupsContract.artifact, wallet) as Promise<PrivateGroupsContract>;
  }

  
  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, admin: AztecAddressLike, group_members: AztecAddressLike[]) {
    return new DeployMethod<PrivateGroupsContract>(PublicKeys.default(), wallet, PrivateGroupsContractArtifact, PrivateGroupsContract.at, Array.from(arguments).slice(1));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeys(publicKeys: PublicKeys, wallet: Wallet, admin: AztecAddressLike, group_members: AztecAddressLike[]) {
    return new DeployMethod<PrivateGroupsContract>(publicKeys, wallet, PrivateGroupsContractArtifact, PrivateGroupsContract.at, Array.from(arguments).slice(2));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof PrivateGroupsContract['methods']>(
    opts: { publicKeys?: PublicKeys; method?: M; wallet: Wallet },
    ...args: Parameters<PrivateGroupsContract['methods'][M]>
  ) {
    return new DeployMethod<PrivateGroupsContract>(
      opts.publicKeys ?? PublicKeys.default(),
      opts.wallet,
      PrivateGroupsContractArtifact,
      PrivateGroupsContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }
  

  
  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return PrivateGroupsContractArtifact;
  }
  

  public static get storage(): ContractStorageLayout<'admin' | 'group_members' | 'group_balances_credit' | 'group_balances_debt'> {
      return {
        admin: {
      slot: new Fr(1n),
    },
group_members: {
      slot: new Fr(2n),
    },
group_balances_credit: {
      slot: new Fr(3n),
    },
group_balances_debt: {
      slot: new Fr(4n),
    }
      } as ContractStorageLayout<'admin' | 'group_members' | 'group_balances_credit' | 'group_balances_debt'>;
    }
    

  public static get notes(): ContractNotes<'NewAddressNote' | 'ValueNote'> {
    return {
      NewAddressNote: {
          id: new NoteSelector(4235158996),
        },
ValueNote: {
          id: new NoteSelector(1038582377),
        }
    } as ContractNotes<'NewAddressNote' | 'ValueNote'>;
  }
  

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public declare methods: {
    
    /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
    compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** constructor(admin: struct, group_members: array) */
    constructor: ((admin: AztecAddressLike, group_members: AztecAddressLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_admin() */
    get_admin: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_group_members(member: struct) */
    get_group_members: ((member: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** make_payment(debtor: struct, creditor: struct, amount: field) */
    make_payment: ((debtor: AztecAddressLike, creditor: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** read_balance_credit(creditor: struct, debtor: struct) */
    read_balance_credit: ((creditor: AztecAddressLike, debtor: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** read_balance_debt(debtor: struct, creditor: struct) */
    read_balance_debt: ((debtor: AztecAddressLike, creditor: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** read_total_balance(creditor: struct, debtor: struct) */
    read_total_balance: ((creditor: AztecAddressLike, debtor: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** set_balance(creditor: struct, debtor: struct, amount: field) */
    set_balance: ((creditor: AztecAddressLike, debtor: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** setup_group_payments(creditor: struct, debtors: array, amount: field) */
    setup_group_payments: ((creditor: AztecAddressLike, debtors: AztecAddressLike[], amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
  };

  
}
