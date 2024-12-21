import { assert } from './js_utils.js';
/**
 * Handles mapping of classes to names, and calling toString and fromString to convert to and from JSON-friendly formats.
 * Takes a class map as input.
 */
export class ClassConverter {
    /**
     * Create a class converter from a table of classes.
     * @param stringClassMap - The class table of string encoded classes.
     * @param objectClassMap - The class table of complex object classes
     */
    constructor(stringClassMap, objectClassMap) {
        this.toClass = new Map();
        this.toName = new Map();
        if (stringClassMap) {
            for (const key of Object.keys(stringClassMap)) {
                this.register(key, stringClassMap[key], 'string');
            }
        }
        if (objectClassMap) {
            for (const key of Object.keys(objectClassMap)) {
                this.register(key, objectClassMap[key], 'object');
            }
        }
    }
    /**
     * Register a class with a certain name.
     * This name is used for conversion from and to this class.
     * @param type - The class name to use for serialization.
     * @param class_ - The class object.
     * @param encoding - Whether the class is a complex object or simply represented by a string.
     */
    register(type, class_, encoding) {
        assert(type !== 'Buffer', "'Buffer' handling is hardcoded. Cannot use as name.");
        assert(class_.prototype['toString'] || class_.prototype['toJSON'], `Class ${type} must define a toString() OR toJSON() method.`);
        assert(class_['fromString'] || class_['fromJSON'], `Class ${type} must define a fromString() OR fromJSON() static method.`);
        this.toName.set(class_, [type, encoding]);
        this.toClass.set(type, [class_, encoding]);
    }
    /**
     * Does this type name have a registered class?
     * @param type - The type name.
     * @returns If there's a registered class.
     */
    isRegisteredClassName(type) {
        return this.toClass.has(type);
    }
    /**
     * Is this class object registered?
     * @param obj - The class object.
     * @returns If it is a registered class.
     */
    isRegisteredClass(obj) {
        const name = obj.prototype.constructor.name;
        return this.toName.has(obj) || this.isRegisteredClassName(name);
    }
    /**
     * Convert a JSON-like object to a class object.
     * @param jsonObj - An object encoding a class.
     * @returns The class object.
     */
    toClassObj(jsonObj) {
        const result = this.toClass.get(jsonObj.type);
        assert(result, `Could not find type in lookup.`);
        const [class_, encoding] = result;
        if (encoding === 'string' && typeof jsonObj.data === 'string') {
            return class_.fromString(jsonObj.data);
        }
        else {
            return class_.fromJSON(jsonObj.data);
        }
    }
    /**
     * Convert a class object to a JSON object.
     * @param classObj - A JSON encoding a class.
     * @returns The class object.
     */
    toJsonObj(classObj) {
        const { type, encoding } = this.lookupObject(classObj);
        const data = encoding === 'string' ? classObj.toString() : classObj.toJSON();
        return { type: type, data };
    }
    /**
     * Loads the corresponding type for this class based on constructor first and constructor name if not found.
     * Constructor match works in the event of a minifier changing function names, and constructor name match
     * works in the event of duplicated instances of node modules being loaded (see #1826).
     * @param classObj - Object to lookup in the registered types.
     * @returns Registered type name and encoding.
     */
    lookupObject(classObj) {
        const nameResult = this.toName.get(classObj.constructor);
        if (nameResult) {
            return { type: nameResult[0], encoding: nameResult[1] };
        }
        const classResult = this.toClass.get(classObj.constructor.name);
        if (classResult) {
            return { type: classObj.constructor.name, encoding: classResult[1] };
        }
        throw new Error(`Could not find class ${classObj.constructor.name} in lookup.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NfY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzb24tcnBjL2NsYXNzX2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUd2Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUl6Qjs7OztPQUlHO0lBQ0gsWUFBWSxjQUEwQyxFQUFFLGNBQXdDO1FBUnhGLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUN0RCxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7UUFRM0QsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBZSxFQUFFLFFBQXVCO1FBQzdELE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLHFEQUFxRCxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMs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