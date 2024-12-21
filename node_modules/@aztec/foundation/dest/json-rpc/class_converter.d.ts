/**
 * Represents a class compatible with our class conversion system.
 * E.g. PublicKey here satisfies 'StringIOClass'.
 * ```
 *    class PublicKey {
 *      toString() {
 *        return '...';
 *      }
 *      static fromString(str) {
 *        return new PublicKey(...);
 *      }
 *    }
 * ```
 */
interface StringIOClass {
    new (...args: any): any;
    /**
     * Creates an IOClass from a given string.
     */
    fromString: (str: string) => any;
}
/**
 * Represents a class compatible with our class conversion system.
 * E.g. PublicKey here satisfies 'ObjIOClass'.
 * ```
 *    class PublicKey {
 *      toJSON() {
 *        return {...};
 *      }
 *      static fromJSON(obj) {
 *        return new PublicKey({...});
 *      }
 *    }
 * ```
 */
interface ObjIOClass {
    new (...args: any): any;
    /**
     * Creates an IOClass from a given JSON object.
     */
    fromJSON: (str: object) => any;
}
/**
 * Either a StringIOClass or ObjIOClass
 */
type IOClass = ObjIOClass | StringIOClass;
/**
 * Registered classes available for conversion.
 */
export interface StringClassConverterInput {
    [className: string]: StringIOClass;
}
/**
 * Registered classes available for conversion.
 */
export interface JsonClassConverterInput {
    [className: string]: ObjIOClass;
}
/**
 * Represents a class in a JSON-friendly encoding.
 */
export interface StringEncodedClass {
    /**
     * The class type.
     */
    type: string;
    /**
     * The class data string.
     */
    data: string;
}
/**
 * Represents a class in a JSON-friendly encoding.
 */
export interface JsonEncodedClass {
    /**
     * The class type.
     */
    type: string;
    /**
     * The class data string.
     */
    data: object;
}
/**
 * Whether a class is a complex object or simply represented by a string.
 */
export type ClassEncoding = 'string' | 'object';
/**
 * Handles mapping of classes to names, and calling toString and fromString to convert to and from JSON-friendly formats.
 * Takes a class map as input.
 */
export declare class ClassConverter {
    private toClass;
    private toName;
    /**
     * Create a class converter from a table of classes.
     * @param stringClassMap - The class table of string encoded classes.
     * @param objectClassMap - The class table of complex object classes
     */
    constructor(stringClassMap?: StringClassConverterInput, objectClassMap?: JsonClassConverterInput);
    /**
     * Register a class with a certain name.
     * This name is used for conversion from and to this class.
     * @param type - The class name to use for serialization.
     * @param class_ - The class object.
     * @param encoding - Whether the class is a complex object or simply represented by a string.
     */
    register(type: string, class_: IOClass, encoding: ClassEncoding): void;
    /**
     * Does this type name have a registered class?
     * @param type - The type name.
     * @returns If there's a registered class.
     */
    isRegisteredClassName(type: string): boolean;
    /**
     * Is this class object registered?
     * @param obj - The class object.
     * @returns If it is a registered class.
     */
    isRegisteredClass(obj: any): boolean;
    /**
     * Convert a JSON-like object to a class object.
     * @param jsonObj - An object encoding a class.
     * @returns The class object.
     */
    toClassObj(jsonObj: JsonEncodedClass | StringEncodedClass): any;
    /**
     * Convert a class object to a JSON object.
     * @param classObj - A JSON encoding a class.
     * @returns The class object.
     */
    toJsonObj(classObj: any): JsonEncodedClass | StringEncodedClass;
    /**
     * Loads the corresponding type for this class based on constructor first and constructor name if not found.
     * Constructor match works in the event of a minifier changing function names, and constructor name match
     * works in the event of duplicated instances of node modules being loaded (see #1826).
     * @param classObj - Object to lookup in the registered types.
     * @returns Registered type name and encoding.
     */
    private lookupObject;
}
export {};
//# sourceMappingURL=class_converter.d.ts.map