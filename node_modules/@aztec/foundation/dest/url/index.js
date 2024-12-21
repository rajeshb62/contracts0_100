/* eslint-disable */
// Copyright (c) 2014 Nathan Rajlich <nathan@tootallnate.net>
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
import { sep } from 'path';
/**
 * File URI to Path function.
 *
 * @param {String} uri
 * @return {String} path
 * @api public
 */
export function fileURLToPath(uri) {
    if (typeof uri !== 'string' || uri.length <= 7 || uri.substring(0, 7) !== 'file://') {
        throw new TypeError('must pass in a file:// URI to convert to a file path');
    }
    const rest = decodeURI(uri.substring(7));
    const firstSlash = rest.indexOf('/');
    let host = rest.substring(0, firstSlash);
    let path = rest.substring(firstSlash + 1);
    // 2.  Scheme Definition
    // As a special case, <host> can be the string "localhost" or the empty
    // string; this is interpreted as "the machine from which the URL is
    // being interpreted".
    if (host === 'localhost') {
        host = '';
    }
    if (host) {
        host = sep + sep + host;
    }
    // 3.2  Drives, drive letters, mount points, file system root
    // Drive letters are mapped into the top of a file URI in various ways,
    // depending on the implementation; some applications substitute
    // vertical bar ("|") for the colon after the drive letter, yielding
    // "file:///c|/tmp/test.txt".  In some cases, the colon is left
    // unchanged, as in "file:///c:/tmp/test.txt".  In other cases, the
    // colon is simply omitted, as in "file:///c/tmp/test.txt".
    path = path.replace(/^(.+)\|/, '$1:');
    // for Windows, we need to invert the path separators from what a URI uses
    if (sep === '\\') {
        path = path.replace(/\//g, '\\');
    }
    if (/^.+:/.test(path)) {
        // has Windows drive at beginning of path
    }
    else {
        // unix path…
        path = sep + path;
    }
    return host + path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXJsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQiw2REFBNkQ7QUFDN0Qsd0VBQXdFO0FBQ3hFLGtFQUFrRTtBQUNsRSxzRUFBc0U7QUFDdEUsc0VBQXNFO0FBQ3RFLHFFQUFxRTtBQUNyRSx3RUFBd0U7QUFDeEUsNEJBQTRCO0FBQzVCLGlFQUFpRTtBQUNqRSxrRUFBa0U7QUFDbEUsa0VBQWtFO0FBQ2xFLHFFQUFxRTtBQUNyRSx5RUFBeUU7QUFDekUsdUVBQXVFO0FBQ3ZFLHVFQUF1RTtBQUN2RSxvRUFBb0U7QUFDcEUseURBQXlEO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0I7Ozs7OztHQU1HO0FBRUgsTUFBTSxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQ3ZDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3BGLE1BQU0sSUFBSSxTQUFTLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTFDLHdCQUF3QjtJQUN4Qix1RUFBdUU7SUFDdkUsb0VBQW9FO0lBQ3BFLHNCQUFzQjtJQUN0QixJQUFJLElBQUksS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELElBQUksSUFBSSxFQUFFLENBQUM7UUFDVCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELDZEQUE2RDtJQUM3RCx1RUFBdUU7SUFDdkUsZ0VBQWdFO0lBQ2hFLG9FQUFvRTtJQUNwRSwrREFBK0Q7SUFDL0QsbUVBQW1FO0lBQ25FLDJEQUEyRDtJQUMzRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEMsMEVBQTBFO0lBQzFFLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEIseUNBQXlDO0lBQzNDLENBQUM7U0FBTSxDQUFDO1FBQ04sYUFBYTtRQUNiLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxPQUFPLElBQUksR0FBRyxJQUFJLENBQUM7QUFDckIsQ0FBQyJ9