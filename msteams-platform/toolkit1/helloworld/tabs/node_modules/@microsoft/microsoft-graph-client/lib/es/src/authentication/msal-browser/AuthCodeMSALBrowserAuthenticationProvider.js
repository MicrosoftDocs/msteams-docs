/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { __awaiter } from "tslib";
/**
 * @module AuthCodeMSALBrowserAuthenticationProvider
 */
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { GraphClientError } from "../../GraphClientError";
/**
 * an AuthenticationProvider implementation supporting msal-browser library.
 * This feature is introduced in Version 3.0.0
 * @class
 * @extends AuthenticationProvider
 */
export class AuthCodeMSALBrowserAuthenticationProvider {
    /**
     * @public
     * @constructor
     * Creates an instance of ImplicitMSALAuthenticationProvider
     * @param {PublicClientApplication} msalApplication - An instance of MSAL PublicClientApplication
     * @param {AuthCodeMSALBrowserAuthenticationProviderOptions} options - An instance of MSALAuthenticationProviderOptions
     * @returns An instance of ImplicitMSALAuthenticationProvider
     */
    constructor(publicClientApplication, options) {
        this.publicClientApplication = publicClientApplication;
        this.options = options;
        if (!options || !publicClientApplication) {
            throw new GraphClientError("Please pass valid PublicClientApplication instance and AuthCodeMSALBrowserAuthenticationProviderOptions instance to instantiate MSALBrowserAuthenticationProvider");
        }
    }
    /**
     * @public
     * @async
     * To get the access token for the request
     * @returns The promise that resolves to an access token
     */
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const scopes = this.options && this.options.scopes;
            const account = this.options && this.options.account;
            const error = new GraphClientError();
            if (!scopes || scopes.length === 0) {
                error.name = "Empty Scopes";
                error.message = "Scopes cannot be empty, Please provide scopes";
                throw error;
            }
            try {
                const response = yield this.publicClientApplication.acquireTokenSilent({
                    scopes,
                    account,
                });
                if (!response || !response.accessToken) {
                    error.name = "Access token is undefined";
                    error.message = "Received empty access token from PublicClientApplication";
                    throw error;
                }
                return response.accessToken;
            }
            catch (error) {
                if (error instanceof InteractionRequiredAuthError) {
                    if (this.options.interactionType === InteractionType.Redirect) {
                        this.publicClientApplication.acquireTokenRedirect({ scopes });
                    }
                    else if (this.options.interactionType === InteractionType.Popup) {
                        const response = yield this.publicClientApplication.acquireTokenPopup({ scopes });
                        return response.accessToken;
                    }
                }
                else {
                    throw error;
                }
            }
        });
    }
}
//# sourceMappingURL=AuthCodeMSALBrowserAuthenticationProvider.js.map