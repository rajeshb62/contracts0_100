import { ClassConverter, type JsonClassConverterInput, type StringClassConverterInput } from '../class_converter.js';
/**
 * A map of class names to class constructors.
 */
export type ClassMaps = {
    /** The String class map */
    stringClassMap: StringClassConverterInput;
    /** The object class map */
    objectClassMap: JsonClassConverterInput;
};
/**
 * Handles conversion of objects over the write.
 * Delegates to a ClassConverter object.
 */
export declare class JsonProxy {
    private handler;
    private stringClassMap;
    private objectClassMap;
    classConverter: ClassConverter;
    constructor(handler: object, stringClassMap: StringClassConverterInput, objectClassMap: JsonClassConverterInput);
    /**
     * Call an RPC method.
     * @param methodName - The RPC method.
     * @param jsonParams - The RPG parameters.
     * @param skipConversion - Whether to skip conversion of the parameters.
     * @returns The remote result.
     */
    call(methodName: string, jsonParams?: any[], skipConversion?: boolean): Promise<any>;
}
//# sourceMappingURL=json_proxy.d.ts.map