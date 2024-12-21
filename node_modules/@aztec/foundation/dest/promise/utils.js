/**
 * A polyfill for the Promise.withResolvers proposed API.
 * @see https://github.com/tc39/proposal-promise-with-resolvers
 * @returns A promise with resolvers.
 */
export function promiseWithResolvers() {
    // use ! operator to avoid TS error
    let resolve;
    let reject;
    // the ES spec guarantees that the promise executor is called synchronously
    // so the resolve and reject functions will be defined
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        promise,
        resolve,
        reject,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvbWlzZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxtQ0FBbUM7SUFDbkMsSUFBSSxPQUE0QixDQUFDO0lBQ2pDLElBQUksTUFBK0IsQ0FBQztJQUVwQywyRUFBMkU7SUFDM0Usc0RBQXNEO0lBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDZCxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0wsT0FBTztRQUNQLE9BQU87UUFDUCxNQUFNO0tBQ1AsQ0FBQztBQUNKLENBQUMifQ==