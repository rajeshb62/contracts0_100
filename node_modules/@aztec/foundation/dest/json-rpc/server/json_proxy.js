import { format } from 'util';
import { createDebugLogger } from '../../log/index.js';
import { ClassConverter } from '../class_converter.js';
import { convertFromJsonObj, convertToJsonObj } from '../convert.js';
import { assert, hasOwnProperty } from '../js_utils.js';
const log = createDebugLogger('json-rpc:json_proxy');
/**
 * Handles conversion of objects over the write.
 * Delegates to a ClassConverter object.
 */
export class JsonProxy {
    constructor(handler, stringClassMap, objectClassMap) {
        this.handler = handler;
        this.stringClassMap = stringClassMap;
        this.objectClassMap = objectClassMap;
        this.classConverter = new ClassConverter(stringClassMap, objectClassMap);
    }
    /**
     * Call an RPC method.
     * @param methodName - The RPC method.
     * @param jsonParams - The RPG parameters.
     * @param skipConversion - Whether to skip conversion of the parameters.
     * @returns The remote result.
     */
    async call(methodName, jsonParams = [], skipConversion = false) {
        log.debug(format(`JsonProxy:call`, methodName, jsonParams));
        // Get access to our class members
        const proto = Object.getPrototypeOf(this.handler);
        assert(hasOwnProperty(proto, methodName), `JsonProxy: Method ${methodName} not found!`);
        assert(Array.isArray(jsonParams), `JsonProxy: ${methodName} params not an array: ${jsonParams}`);
        // convert the params from json representation to classes
        let convertedParams = jsonParams;
        if (!skipConversion) {
            convertedParams = jsonParams.map(param => convertFromJsonObj(this.classConverter, param));
        }
        log.debug(format('JsonProxy:call', methodName, '<-', convertedParams));
        const rawRet = await this.handler[methodName](...convertedParams);
        let ret = rawRet;
        if (!skipConversion) {
            ret = convertToJsonObj(this.classConverter, rawRet);
        }
        log.debug(format('JsonProxy:call', methodName, '->', ret));
        return ret;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9wcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qc29uLXJwYy9zZXJ2ZXIvanNvbl9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQWdFLE1BQU0sdUJBQXVCLENBQUM7QUFDckgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQVlyRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUVwQixZQUNVLE9BQWUsRUFDZixjQUF5QyxFQUN6QyxjQUF1QztRQUZ2QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQTJCO1FBQ3pDLG1CQUFjLEdBQWQsY0FBYyxDQUF5QjtRQUUvQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFrQixFQUFFLGFBQW9CLEVBQUUsRUFBRSxjQUFjLEdBQUcsS0FBSztRQUNsRixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1RCxrQ0FBa0M7UUFDbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUscUJBQXFCLFVBQVUsYUFBYSxDQUFDLENBQUM7UUFDeEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsY0FBYyxVQUFVLHlCQUF5QixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLHlEQUF5RDtRQUN6RCxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFDRCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxNQUFNLEdBQUcsTUFBTyxJQUFJLENBQUMsT0FBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDM0UsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixHQUFHLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGIn0=