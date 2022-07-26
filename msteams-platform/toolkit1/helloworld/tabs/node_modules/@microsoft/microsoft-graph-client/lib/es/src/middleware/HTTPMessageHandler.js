/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { __awaiter } from "tslib";
/**
 * @class
 * @implements Middleware
 * Class for HTTPMessageHandler
 */
export class HTTPMessageHandler {
    /**
     * @public
     * @async
     * To execute the current middleware
     * @param {Context} context - The request context object
     * @returns A promise that resolves to nothing
     */
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            context.response = yield fetch(context.request, context.options);
        });
    }
}
//# sourceMappingURL=HTTPMessageHandler.js.map