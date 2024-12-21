import { GeneratorIndex } from '../constants.gen.js';
export function getKeyGenerator(prefix) {
    // We get enum key by capitalizing key prefix and concatenating it with 'SK_M'
    const enumKey = `${prefix.toUpperCase()}SK_M`;
    return GeneratorIndex[enumKey];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMva2V5cy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxNQUFpQjtJQUMvQyw4RUFBOEU7SUFDOUUsTUFBTSxPQUFPLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztJQUM5QyxPQUFPLGNBQWMsQ0FBQyxPQUFzQyxDQUFpQixDQUFDO0FBQ2hGLENBQUMifQ==