import { DefaultAccountInterface } from '../defaults/account_interface.js';
/**
 * Base class for implementing an account contract. Requires that the account uses the
 * default entrypoint method signature.
 */
export class DefaultAccountContract {
    constructor(artifact) {
        this.artifact = artifact;
    }
    getContractArtifact() {
        return this.artifact;
    }
    getInterface(address, nodeInfo) {
        return new DefaultAccountInterface(this.getAuthWitnessProvider(address), address, nodeInfo);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWZhdWx0cy9hY2NvdW50X2NvbnRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTNFOzs7R0FHRztBQUNILE1BQU0sT0FBZ0Isc0JBQXNCO0lBSTFDLFlBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUVsRCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBd0IsRUFBRSxRQUFrQjtRQUN2RCxPQUFPLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5RixDQUFDO0NBQ0YifQ==