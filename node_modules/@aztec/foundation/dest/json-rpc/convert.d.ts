import { type ClassConverter } from './class_converter.js';
/**
 * Recursively looks through an object for bigints and converts them to object format.
 * @param obj - The object to convert.
 * @returns The converted object with stringified bigints.
 */
export declare const convertBigintsInObj: (obj: any) => any;
/**
 * JSON.stringify helper that handles bigints.
 * @param obj - The object to be stringified.
 * @returns The resulting string.
 */
export declare function JsonStringify(obj: object, prettify?: boolean): string;
/**
 * Convert a JSON-friendly object, which may encode a class object.
 * @param cc - The class converter.
 * @param obj - The encoded object.
 * @returns The decoded object.
 */
export declare function convertFromJsonObj(cc: ClassConverter, obj: any): any;
/**
 * Convert objects or classes to a JSON-friendly object.
 * @param cc - The class converter.
 * @param obj - The object.
 * @returns The encoded object.
 */
export declare function convertToJsonObj(cc: ClassConverter, obj: any): any;
//# sourceMappingURL=convert.d.ts.map