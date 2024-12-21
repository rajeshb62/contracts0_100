import { default as hash } from 'hash.js';
import { GrumpkinScalar } from '../../fields/fields.js';
import { serializeToBuffer } from '../../serialize/serialize.js';
export const sha512 = (data) => Buffer.from(hash.sha512().update(data).digest());
/**
 * @dev We don't truncate in this function (unlike in sha256ToField) because this function is used in situations where
 * we don't care only about collision resistance but we need the output to be uniformly distributed as well. This is
 * because we use it as a pseudo-random function.
 */
export const sha512ToGrumpkinScalar = (data) => {
    const buffer = serializeToBuffer(data);
    return GrumpkinScalar.fromBufferReduce(sha512(buffer));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3NoYTUxMi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWxGLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFFekY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLENBQUMsSUFBa0IsRUFBRSxFQUFFO0lBQzNELE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sY0FBYyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQyJ9