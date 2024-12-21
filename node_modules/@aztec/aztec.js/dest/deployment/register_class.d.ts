import { type ContractArtifact } from '@aztec/foundation/abi';
import { type ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
import { type Wallet } from '../wallet/index.js';
/** Sets up a call to register a contract class given its artifact. */
export declare function registerContractClass(wallet: Wallet, artifact: ContractArtifact): Promise<ContractFunctionInteraction>;
//# sourceMappingURL=register_class.d.ts.map