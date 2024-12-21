/**
 * Register a class here that has a toJSON method that returns:
 * ```
 * {
 *   "type": "ExampleClassName",
 *   "value": <result of ExampleClassName.toString()>
 * }
 * ```
 * and has an e.g. ExampleClassName.fromString(string) method.
 * This means you can then easily serialize/deserialize the type using JSON.stringify and JSON.parse.
 */
export class TypeRegistry {
    static register(typeName, constructor) {
        this.registry.set(typeName, constructor);
    }
    static getConstructor(typeName) {
        return this.registry.get(typeName);
    }
}
TypeRegistry.registry = new Map();
// Resolver function that enables JSON serialization of BigInts.
export function resolver(_, value) {
    return typeof value === 'bigint' ? value.toString() + 'n' : value;
}
// Reviver function that uses TypeRegistry to instantiate objects.
export function reviver(key, value) {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
    }
    if (value && typeof value === 'object' && 'type' in value && 'value' in value) {
        const Constructor = TypeRegistry.getConstructor(value.type);
        if (Constructor) {
            return Constructor.fromString(value.value);
        }
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZV9yZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvdHlwZV9yZWdpc3RyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFHaEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFnQixFQUFFLFdBQTJCO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFnQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O0FBUmMscUJBQVEsR0FBZ0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQVduRSxnRUFBZ0U7QUFDaEUsTUFBTSxVQUFVLFFBQVEsQ0FBQyxDQUFNLEVBQUUsS0FBVTtJQUN6QyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BFLENBQUM7QUFFRCxrRUFBa0U7QUFDbEUsTUFBTSxVQUFVLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBVTtJQUM3QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7UUFDOUUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNoQixPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIn0=