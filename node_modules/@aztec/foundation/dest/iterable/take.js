import { isAsyncIterable } from './isAsyncIt.js';
function take(source, limit) {
    if (isAsyncIterable(source)) {
        return (async function* () {
            let items = 0;
            if (limit < 1) {
                return;
            }
            for await (const entry of source) {
                yield entry;
                items++;
                if (items === limit) {
                    return;
                }
            }
        })();
    }
    return (function* () {
        let items = 0;
        if (limit < 1) {
            return;
        }
        for (const entry of source) {
            yield entry;
            items++;
            if (items === limit) {
                return;
            }
        }
    })();
}
export { take };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pdGVyYWJsZS90YWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVVqRCxTQUFTLElBQUksQ0FDWCxNQUFzQyxFQUN0QyxLQUFhO0lBRWIsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsS0FBSyxTQUFTLENBQUM7WUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsT0FBTztZQUNULENBQUM7WUFFRCxJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxLQUFLLENBQUM7Z0JBRVosS0FBSyxFQUFFLENBQUM7Z0JBRVIsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3BCLE9BQU87Z0JBQ1QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNkLE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMzQixNQUFNLEtBQUssQ0FBQztZQUVaLEtBQUssRUFBRSxDQUFDO1lBRVIsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDUCxDQUFDO0FBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDIn0=