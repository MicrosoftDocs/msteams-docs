"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryHandlerOptions = exports.FeatureUsageFlag = void 0;
var MiddlewareControl_1 = require("../MiddlewareControl");
/**
 * @enum
 * @property {number} NONE - The hexadecimal flag value for nothing enabled
 * @property {number} REDIRECT_HANDLER_ENABLED - The hexadecimal flag value for redirect handler enabled
 * @property {number} RETRY_HANDLER_ENABLED - The hexadecimal flag value for retry handler enabled
 * @property {number} AUTHENTICATION_HANDLER_ENABLED - The hexadecimal flag value for the authentication handler enabled
 */
var FeatureUsageFlag;
(function (FeatureUsageFlag) {
    /* eslint-disable  @typescript-eslint/naming-convention */
    FeatureUsageFlag[FeatureUsageFlag["NONE"] = 0] = "NONE";
    FeatureUsageFlag[FeatureUsageFlag["REDIRECT_HANDLER_ENABLED"] = 1] = "REDIRECT_HANDLER_ENABLED";
    FeatureUsageFlag[FeatureUsageFlag["RETRY_HANDLER_ENABLED"] = 2] = "RETRY_HANDLER_ENABLED";
    FeatureUsageFlag[FeatureUsageFlag["AUTHENTICATION_HANDLER_ENABLED"] = 4] = "AUTHENTICATION_HANDLER_ENABLED";
    /* eslint-enable  @typescript-eslint/naming-convention */
})(FeatureUsageFlag = exports.FeatureUsageFlag || (exports.FeatureUsageFlag = {}));
/**
 * @class
 * @implements MiddlewareOptions
 * Class for TelemetryHandlerOptions
 */
var TelemetryHandlerOptions = /** @class */ (function () {
    function TelemetryHandlerOptions() {
        /**
         * @private
         * A member to hold the OR of feature usage flags
         */
        this.featureUsage = FeatureUsageFlag.NONE;
    }
    /**
     * @public
     * @static
     * To update the feature usage in the context object
     * @param {Context} context - The request context object containing middleware options
     * @param {FeatureUsageFlag} flag - The flag value
     * @returns nothing
     */
    TelemetryHandlerOptions.updateFeatureUsageFlag = function (context, flag) {
        var options;
        if (context.middlewareControl instanceof MiddlewareControl_1.MiddlewareControl) {
            options = context.middlewareControl.getMiddlewareOptions(TelemetryHandlerOptions);
        }
        else {
            context.middlewareControl = new MiddlewareControl_1.MiddlewareControl();
        }
        if (typeof options === "undefined") {
            options = new TelemetryHandlerOptions();
            context.middlewareControl.setMiddlewareOptions(TelemetryHandlerOptions, options);
        }
        options.setFeatureUsage(flag);
    };
    /**
     * @private
     * To set the feature usage flag
     * @param {FeatureUsageFlag} flag - The flag value
     * @returns nothing
     */
    TelemetryHandlerOptions.prototype.setFeatureUsage = function (flag) {
        this.featureUsage = this.featureUsage | flag;
    };
    /**
     * @public
     * To get the feature usage
     * @returns A feature usage flag as hexadecimal string
     */
    TelemetryHandlerOptions.prototype.getFeatureUsage = function () {
        return this.featureUsage.toString(16);
    };
    return TelemetryHandlerOptions;
}());
exports.TelemetryHandlerOptions = TelemetryHandlerOptions;
//# sourceMappingURL=TelemetryHandlerOptions.js.map