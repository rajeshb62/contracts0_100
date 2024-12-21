/**
 * Determines if the given 'msg' is an EventMessage by checking if its 'msgId' property is undefined.
 * Returns true if the input message is of type EventMessage, otherwise false. This utility function can be used
 * to differentiate between instances of ResponseMessage and EventMessage that share a common Payload type.
 *
 * @param msg - The message object that can be either a ResponseMessage or EventMessage with a specific payload.
 * @returns A boolean value indicating whether the input message is an EventMessage (true) or not (false).
 */
export function isEventMessage(msg) {
    return msg.msgId === undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNwb3J0L2Rpc3BhdGNoL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDQTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsR0FBcUQ7SUFFckQsT0FBUSxHQUFnQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDL0QsQ0FBQyJ9