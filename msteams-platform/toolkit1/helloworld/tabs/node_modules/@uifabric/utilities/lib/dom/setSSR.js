export var _isSSR = false;
/**
 * Helper to set ssr mode to simulate no window object returned from getWindow helper.
 *
 * @public
 */
export function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
//# sourceMappingURL=setSSR.js.map