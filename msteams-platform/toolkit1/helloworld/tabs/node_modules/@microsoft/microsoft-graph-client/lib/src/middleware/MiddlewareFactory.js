"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareFactory = void 0;
var AuthenticationHandler_1 = require("./AuthenticationHandler");
var HTTPMessageHandler_1 = require("./HTTPMessageHandler");
var RedirectHandlerOptions_1 = require("./options/RedirectHandlerOptions");
var RetryHandlerOptions_1 = require("./options/RetryHandlerOptions");
var RedirectHandler_1 = require("./RedirectHandler");
var RetryHandler_1 = require("./RetryHandler");
var TelemetryHandler_1 = require("./TelemetryHandler");
/**
 * @private
 * To check whether the environment is node or not
 * @returns A boolean representing the environment is node or not
 */
var isNodeEnvironment = function () {
    return typeof process === "object" && typeof require === "function";
};
/**
 * @class
 * Class containing function(s) related to the middleware pipelines.
 */
var MiddlewareFactory = /** @class */ (function () {
    function MiddlewareFactory() {
    }
    /**
     * @public
     * @static
     * Returns the default middleware chain an array with the  middleware handlers
     * @param {AuthenticationProvider} authProvider - The authentication provider instance
     * @returns an array of the middleware handlers of the default middleware chain
     */
    MiddlewareFactory.getDefaultMiddlewareChain = function (authProvider) {
        var middleware = [];
        var authenticationHandler = new AuthenticationHandler_1.AuthenticationHandler(authProvider);
        var retryHandler = new RetryHandler_1.RetryHandler(new RetryHandlerOptions_1.RetryHandlerOptions());
        var telemetryHandler = new TelemetryHandler_1.TelemetryHandler();
        var httpMessageHandler = new HTTPMessageHandler_1.HTTPMessageHandler();
        middleware.push(authenticationHandler);
        middleware.push(retryHandler);
        if (isNodeEnvironment()) {
            var redirectHandler = new RedirectHandler_1.RedirectHandler(new RedirectHandlerOptions_1.RedirectHandlerOptions());
            middleware.push(redirectHandler);
        }
        middleware.push(telemetryHandler);
        middleware.push(httpMessageHandler);
        return middleware;
    };
    return MiddlewareFactory;
}());
exports.MiddlewareFactory = MiddlewareFactory;
//# sourceMappingURL=MiddlewareFactory.js.map