"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = function (message) { return (typeof message === 'string' ? { message: message } : message || {}); };
})(errorUtil = exports.errorUtil || (exports.errorUtil = {}));
//# sourceMappingURL=errorUtil.js.map