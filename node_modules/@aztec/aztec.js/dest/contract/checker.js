/**
 * Validates the given ContractArtifact object by checking its functions and their parameters.
 * Ensures that the ABI has at least one function, a constructor, valid bytecode, and correct parameter types.
 * Throws an error if any inconsistency is detected during the validation process.
 *
 * @param artifact - The ContractArtifact object to be validated.
 * @returns A boolean value indicating whether the artifact is valid or not.
 */
export function abiChecker(artifact) {
    if (!artifact.functions || artifact.functions.length === 0) {
        throw new Error('artifact has no functions');
    }
    artifact.functions.forEach(func => {
        if (!('name' in func && typeof func.name === 'string' && func.name.length > 0)) {
            throw new Error('ABI function has no name');
        }
        // TODO: implement a better check for bytecode (right now only checks if it's > 0)
        if (!('bytecode' in func && func.bytecode.length > 0)) {
            throw new Error('ABI function parameter has incorrect bytecode');
        }
        func.parameters.forEach(param => {
            if (!param.type) {
                throw new Error('ABI function parameter has no type');
            }
            abiParameterTypeChecker(param.type);
        });
    });
    // TODO: implement a better check for constructor (right now only checks if it has it or not)
    if (!artifact.functions.find(func => func.name === 'constructor')) {
        throw new Error('ABI has no constructor');
    }
    return true;
}
/**
 * Validates the ABI function parameter's type by checking its kind and attributes.
 * Throws an error if the type has an unrecognized kind or incorrectly formed attributes.
 * Additionally, checks nested types for array and struct kinds.
 *
 * @param type - The AbiType object representing the type of the ABI function parameter.
 * @returns A boolean value indicating whether the type is valid or not.
 */
function abiParameterTypeChecker(type) {
    switch (type.kind) {
        case 'field':
        case 'boolean':
            return checkAttributes(type, {});
        case 'integer':
            return checkAttributes(type, { sign: 'string', width: 'number' });
        case 'string':
            return checkAttributes(type, { length: 'number' });
        case 'array':
            return checkAttributes(type, { length: 'number', type: 'object' }) && abiParameterTypeChecker(type.type);
        case 'struct':
            return checkAttributes(type, { fields: 'object', path: 'string' }) && checkStruct(type);
        default:
            throw new Error('ABI function parameter has an unrecognized type');
    }
}
/**
 * Check if the structure of the AbiType 'struct' is valid by ensuring field names are strings
 * and their type attribute passes the abiParameterTypeChecker. Returns true on successful validation,
 * otherwise throws an error providing insight into the incorrect formation in the struct.
 *
 * @param type - The StructType object containing an array of fields to validate.
 * @returns A boolean value indicating successful validation of the struct's fields.
 */
function checkStruct(type) {
    return type.fields.reduce((acc, field) => {
        if (!('name' in field && typeof field.name === 'string')) {
            throw new Error('ABI function parameter has an incorrectly formed struct');
        }
        return acc && abiParameterTypeChecker(field.type);
    }, true);
}
/**
 * Check if a provided ABI type has the correct attributes and their associated types.
 * This function compares the given 'type' object's keys with the expected attribute types
 * specified in 'incompleteAttributes', as well as the required 'kind' property.
 * Throws an error if there are any unrecognized attributes or incorrect attribute types.
 *
 * @param type - The ABI type object to be checked for correct attributes.
 * @param incompleteAttributes - An object representing the expected attribute types without the 'kind' property.
 * @returns Returns true if the provided ABI type has the correct attributes and their associated types, otherwise throws an error.
 */
function checkAttributes(type, incompleteAttributes) {
    const typeKeys = Object.keys(type);
    const attributes = { ...incompleteAttributes, kind: 'string' };
    if (typeKeys.length !== Object.keys(attributes).length) {
        throw new Error(`Unrecognized attribute on type ${type.kind}`);
    }
    typeKeys.forEach(element => {
        if (!(element in type && typeof type[element] === attributes[element])) {
            throw new Error(`ABI function parameter has an incorrectly formed ${type.kind}`);
        }
    });
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLFFBQTBCO0lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNELE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDL0UsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCxrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFFRCx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxD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