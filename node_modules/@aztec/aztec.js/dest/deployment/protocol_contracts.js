import { getCanonicalClassRegisterer } from '@aztec/protocol-contracts/class-registerer';
import { getCanonicalInstanceDeployer } from '@aztec/protocol-contracts/instance-deployer';
import { UnsafeContract } from '../contract/unsafe_contract.js';
/** Returns a Contract wrapper for the class registerer. */
export function getRegistererContract(wallet) {
    const { artifact, instance } = getCanonicalClassRegisterer();
    return new UnsafeContract(instance, artifact, wallet);
}
/** Returns a Contract wrapper for the instance deployer. */
export function getDeployerContract(wallet) {
    const { artifact, instance } = getCanonicalInstanceDeployer();
    return new UnsafeContract(instance, artifact, wallet);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9jb2xfY29udHJhY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlcGxveW1lbnQvcHJvdG9jb2xfY29udHJhY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTNGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUdoRSwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE1BQWM7SUFDbEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRywyQkFBMkIsRUFBRSxDQUFDO0lBQzdELE9BQU8sSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsNERBQTREO0FBQzVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUFjO0lBQ2hELE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsNEJBQTRCLEVBQUUsQ0FBQztJQUM5RCxPQUFPLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQyJ9