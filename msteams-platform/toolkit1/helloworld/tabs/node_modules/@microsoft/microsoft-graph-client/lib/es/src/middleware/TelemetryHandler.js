/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { __awaiter } from "tslib";
/**
 * @module TelemetryHandler
 */
import { isCustomHost, isGraphURL } from "../GraphRequestUtil";
import { PACKAGE_VERSION } from "../Version";
import { MiddlewareControl } from "./MiddlewareControl";
import { appendRequestHeader, generateUUID, getRequestHeader, setRequestHeader } from "./MiddlewareUtil";
import { TelemetryHandlerOptions } from "./options/TelemetryHandlerOptions";
/**
 * @class
 * @implements Middleware
 * Class for TelemetryHandler
 */
export class TelemetryHandler {
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
                // Add telemetry only if the request url is a Graph URL.
                // Errors are reported as in issue #265 if headers are present when redirecting to a non Graph URL
                let clientRequestId = getRequestHeader(context.request, context.options, TelemetryHandler.CLIENT_REQUEST_ID_HEADER);
                if (!clientRequestId) {
                    clientRequestId = generateUUID();
                    setRequestHeader(context.request, context.options, TelemetryHandler.CLIENT_REQUEST_ID_HEADER, clientRequestId);
                }
                let sdkVersionValue = `${TelemetryHandler.PRODUCT_NAME}/${PACKAGE_VERSION}`;
                let options;
                if (context.middlewareControl instanceof MiddlewareControl) {
                    options = context.middlewareControl.getMiddlewareOptions(TelemetryHandlerOptions);
                }
                if (options) {
                    const featureUsage = options.getFeatureUsage();
                    sdkVersionValue += ` (${TelemetryHandler.FEATURE_USAGE_STRING}=${featureUsage})`;
                }
                appendRequestHeader(context.request, context.options, TelemetryHandler.SDK_VERSION_HEADER, sdkVersionValue);
            }
            else {
                // Remove telemetry headers if present during redirection.
                delete context.options.headers[TelemetryHandler.CLIENT_REQUEST_ID_HEADER];
                delete context.options.headers[TelemetryHandler.SDK_VERSION_HEADER];
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
 * @static
 * A member holding the name of the client request id header
 */
TelemetryHandler.CLIENT_REQUEST_ID_HEADER = "client-request-id";
/**
 * @private
 * @static
 * A member holding the name of the sdk version header
 */
TelemetryHandler.SDK_VERSION_HEADER = "SdkVersion";
/**
 * @private
 * @static
 * A member holding the language prefix for the sdk version header value
 */
TelemetryHandler.PRODUCT_NAME = "graph-js";
/**
 * @private
 * @static
 * A member holding the key for the feature usage metrics
 */
TelemetryHandler.FEATURE_USAGE_STRING = "featureUsage";
//# sourceMappingURL=TelemetryHandler.js.map