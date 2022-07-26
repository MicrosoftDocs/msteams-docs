"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHandlerOptions = void 0;
/**
 * @class
 * @implements MiddlewareOptions
 * Class representing AuthenticationHandlerOptions
 */
var AuthenticationHandlerOptions = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * To create an instance of AuthenticationHandlerOptions
     * @param {AuthenticationProvider} [authenticationProvider] - The authentication provider instance
     * @param {AuthenticationProviderOptions} [authenticationProviderOptions] - The authentication provider options instance
     * @returns An instance of AuthenticationHandlerOptions
     */
    function AuthenticationHandlerOptions(authenticationProvider, authenticationProviderOptions) {
        this.authenticationProvider = authenticationProvider;
        this.authenticationProviderOptions = authenticationProviderOptions;
    }
    return AuthenticationHandlerOptions;
}());
exports.AuthenticationHandlerOptions = AuthenticationHandlerOptions;
//# sourceMappingURL=AuthenticationHandlerOptions.js.map