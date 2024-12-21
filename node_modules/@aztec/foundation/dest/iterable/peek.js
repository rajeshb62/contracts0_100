function peekable(iterable) {
    const [iterator, symbol] = 
    // @ts-expect-error can't use Symbol.asyncIterator to index iterable since it might be Iterable
    iterable[Symbol.asyncIterator] != null
        ? // @ts-expect-error can't use Symbol.asyncIterator to index iterable since it might be Iterable
            [iterable[Symbol.asyncIterator](), Symbol.asyncIterator]
        : // @ts-expect-error can't use Symbol.iterator to index iterable since it might be AsyncIterable
            [iterable[Symbol.iterator](), Symbol.iterator];
    const queue = [];
    // @ts-expect-error can't use symbol to index peekable
    return {
        peek: () => {
            return iterator.next();
        },
        push: (value) => {
            queue.push(value);
        },
        next: () => {
            if (queue.length > 0) {
                return {
                    done: false,
                    value: queue.shift(),
                };
            }
            return iterator.next();
        },
        [symbol]() {
            return this;
        },
    };
}
export { peekable as peek };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVlay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pdGVyYWJsZS9wZWVrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQSxTQUFTLFFBQVEsQ0FBSSxRQUF3QztJQUMzRCxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztJQUN0QiwrRkFBK0Y7SUFDL0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJO1FBQ3BDLENBQUMsQ0FBQywrRkFBK0Y7WUFDL0YsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxRCxDQUFDLENBQUMsK0ZBQStGO1lBQy9GLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyRCxNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFFeEIsc0RBQXNEO0lBQ3RELE9BQU87UUFDTCxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ1QsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUNELElBQUksRUFBRSxHQUFHLEVBQUU7WUFDVCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUU7aUJBQ3JCLENBQUM7WUFDSixDQUFDO1lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELENBQUMsTUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxPQUFPLEVBQUUsUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDIn0=