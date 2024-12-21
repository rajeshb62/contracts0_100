import { peek } from './peek.js';
function isAsyncIterable(thing) {
    return thing[Symbol.asyncIterator] != null;
}
function filter(source, fn) {
    let index = 0;
    if (isAsyncIterable(source)) {
        return (async function* () {
            for await (const entry of source) {
                if (await fn(entry, index++)) {
                    yield entry;
                }
            }
        })();
    }
    // if mapping function returns a promise we have to return an async generator
    const peekable = peek(source);
    const { value, done } = peekable.next();
    if (done === true) {
        return (function* () { })();
    }
    const res = fn(value, index++);
    // @ts-expect-error .then is not present on O
    if (typeof res.then === 'function') {
        return (async function* () {
            if (await res) {
                yield value;
            }
            for await (const entry of peekable) {
                if (await fn(entry, index++)) {
                    yield entry;
                }
            }
        })();
    }
    const func = fn;
    return (function* () {
        if (res === true) {
            yield value;
        }
        for (const entry of peekable) {
            if (func(entry, index++)) {
                yield entry;
            }
        }
    })();
}
export { filter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZXJhYmxlL2ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWpDLFNBQVMsZUFBZSxDQUFJLEtBQVU7SUFDcEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUM3QyxDQUFDO0FBZ0JELFNBQVMsTUFBTSxDQUNiLE1BQXNDLEVBQ3RDLEVBQXlEO0lBRXpELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVkLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLEtBQUssU0FBUyxDQUFDO1lBQ3JCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNqQyxJQUFJLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzdCLE1BQU0sS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRCw2RUFBNkU7SUFDN0UsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXhDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFL0IsNkNBQTZDO0lBQzdDLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztZQUNyQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDO1lBRUQsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ25DLElBQUksTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sSUFBSSxHQUFHLEVBQXdDLENBQUM7SUFFdEQsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNmLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pCLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELEtBQUssTUFBTSxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDUCxDQUFDO0FBRUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDIn0=