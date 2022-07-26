/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { __awaiter } from "tslib";
/**
 * @module CustomAuthenticationProvider
 */
import { GraphClientError } from "./GraphClientError";
/**
 * @class
 * Class representing CustomAuthenticationProvider
 * @extends AuthenticationProvider
 */
export class CustomAuthenticationProvider {
    /**
     * @public
     * @constructor
     * Creates an instance of CustomAuthenticationProvider
     * @param {AuthProviderCallback} provider - An authProvider function
     * @returns An instance of CustomAuthenticationProvider
     */
    constructor(provider) {
        this.provider = provider;
    }
    /**
     * @public
     * @async
     * To get the access token
     * @returns The promise that resolves to an access token
     */
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.provider((error, accessToken) => __awaiter(this, void 0, void 0, function* () {
                    if (accessToken) {
                        resolve(accessToken);
                    }
                    else {
                        if (!error) {
                            const invalidTokenMessage = "Access token is undefined or empty.\
						Please provide a valid token.\
						For more help - https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md";
                            error = new GraphClientError(invalidTokenMessage);
                        }
                        const err = yield GraphClientError.setGraphClientError(error);
                        reject(err);
                    }
                }));
            });
        });
    }
}
//# sourceMappingURL=CustomAuthenticationProvider.js.map