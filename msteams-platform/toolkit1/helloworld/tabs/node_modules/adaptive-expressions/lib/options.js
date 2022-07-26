"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Options used to define evaluation behaviors.
 */
class Options {
    /**
     * Initializes a new instance of the [Options](xref:adaptive-expressions.Options) class.
     *
     * @param opt Optional. An [Options](xref:adaptive-expressions.Options) instance.
     */
    constructor(opt) {
        this.nullSubstitution = opt ? opt.nullSubstitution : undefined;
        this.locale = opt ? opt.locale : undefined;
    }
}
exports.Options = Options;
//# sourceMappingURL=options.js.map