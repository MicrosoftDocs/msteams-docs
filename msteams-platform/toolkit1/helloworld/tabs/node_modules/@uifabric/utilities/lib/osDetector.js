import { getWindow } from './dom/getWindow';
var isMacResult;
/**
 * Returns true if the user is on a Mac. Caches the result value.
 * @param reset - Reset the cached result value (mainly for testing).
 */
export function isMac(reset) {
    if (typeof isMacResult === 'undefined' || reset) {
        var win = getWindow();
        var userAgent = win && win.navigator.userAgent;
        isMacResult = !!userAgent && userAgent.indexOf('Macintosh') !== -1;
    }
    return !!isMacResult;
}
//# sourceMappingURL=osDetector.js.map