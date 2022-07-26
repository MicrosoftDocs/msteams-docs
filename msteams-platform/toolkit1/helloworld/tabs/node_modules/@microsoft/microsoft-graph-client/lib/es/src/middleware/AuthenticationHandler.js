/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { __awaiter } from "tslib";
/**
 * @module AuthenticationHandler
 */
import { isCustomHost, isGraphURL } from "../GraphRequestUtil";
import { MiddlewareControl } from "./MiddlewareControl";
import { appendRequestHeader } from "./MiddlewareUtil";
import { AuthenticationHandlerOptions } from "./options/AuthenticationHandlerOptions";
import { FeatureUsageFlag, TelemetryHandlerOptions } from "./options/TelemetryHandlerOptions";
/**
 * @class
 * @implements Middleware
 * Class representing AuthenticationHandler
 */
export class AuthenticationHandler {
    /**
     * @public
     * @constructor
     * Creates an instance of AuthenticationHandler
     * @param {AuthenticationProvider} authenticationProvider - The authentication provider for the authentication handler
     */
    constructor(authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }
    /**
     * @public
     * @async
     * To execute the current middleware
     * @param {Context} context - The context object of the request
     * @returns A Promise that resolves to nothing
     */
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = typeof context.request === "string" ? context.request : context.request.url;
            if (isGraphURL(url) || (context.customHosts && isCustomHost(url, context.customHosts))) {
                let options;
                if (context.middlewareControl instanceof MiddlewareControl) {
                    options = context.middlewareControl.getMiddlewareOptions(AuthenticationHandlerOptions);
                }
                let authenticationProvider;
                let authenticationProviderOptions;
                if (options) {
                    authenticationProvider = options.authenticationProvider;
                    authenticationProviderOptions = options.authenticationProviderOptions;
                }
                if (!authenticationProvider) {
                    authenticationProvider = this.authenticationProvider;
                }
                const token = yield authenticationProvider.getAccessToken(authenticationProviderOptions);
                const bearerKey = `Bearer ${token}`;
                appendRequestHeader(context.request, context.options, AuthenticationHandler.AUTHORIZATION_HEADER, bearerKey);
                TelemetryHandlerOptions.updateFeatureUsageFlag(context, FeatureUsageFlag.AUTHENTICATION_HANDLER_ENABLED);
            }
            else {
                if (context.options.headers) {
                    delete context.options.headers[AuthenticationHandler.AUTHORIZATION_HEADER];
                }
            }
            return yield this.nextMiddleware.execute(context);
        });
    }
    /**
     * @public
     * To set the next middleware in the chain
     * @param {Middleware} next - The middleware instance
     * @returns Nothing
     */
    setNext(next) {
        this.nextMiddleware = next;
    }
}
/**
 * @private
 * A member representing the authorization header name
 */
AuthenticationHandler.AUTHORIZATION_HEADER = "Authorization";
//# sourceMappingURL=AuthenticationHandler.js.map