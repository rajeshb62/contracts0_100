import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PUBLIC_DATA_TREE_HEIGHT } from '../constants.gen.js';
import { MembershipWitness } from './membership_witness.js';
import { PublicDataTreeLeafPreimage } from './trees/index.js';
export class PublicDataHint {
    constructor(leafSlot, value, overrideCounter, membershipWitness, leafPreimage) {
        this.leafSlot = leafSlot;
        this.value = value;
        this.overrideCounter = overrideCounter;
        this.membershipWitness = membershipWitness;
        this.leafPreimage = leafPreimage;
    }
    static empty() {
        return new PublicDataHint(Fr.ZERO, Fr.ZERO, 0, MembershipWitness.empty(PUBLIC_DATA_TREE_HEIGHT), PublicDataTreeLeafPreimage.empty());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataHint(reader.readObject(Fr), reader.readObject(Fr), reader.readNumber(), MembershipWitness.fromBuffer(reader, PUBLIC_DATA_TREE_HEIGHT), reader.readObject(PublicDataTreeLeafPreimage));
    }
    toBuffer() {
        return serializeToBuffer(this.leafSlot, this.value, this.overrideCounter, this.membershipWitness, this.leafPreimage);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3B1YmxpY19kYXRhX2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5RCxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUNTLFFBQVksRUFDWixLQUFTLEVBQ1QsZUFBdUIsRUFDdkIsaUJBQW9FLEVBQ3BFLFlBQXdDO1FBSnhDLGFBQVEsR0FBUixRQUFRLENBQUk7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFJO1FBQ1Qsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtRDtRQUNwRSxpQkFBWSxHQUFaLFlBQVksQ0FBNEI7SUFDOUMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLGNBQWMsQ0FDdkIsRUFBRSxDQUFDLElBQUksRUFDUCxFQUFFLENBQUMsSUFBSSxFQUNQLENBQUMsRUFDRCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFDaEQsMEJBQTBCLENBQUMsS0FBSyxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxjQUFjLENBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFDbkIsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxFQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQzlDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==