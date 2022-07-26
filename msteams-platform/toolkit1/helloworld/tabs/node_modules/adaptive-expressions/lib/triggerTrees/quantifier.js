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
 * Type of quantifier for expanding trigger expressions.
 */
var QuantifierType;
(function (QuantifierType) {
    /**
     * Within a clause, duplicate any predicate with variable for each possible binding.
     */
    QuantifierType["all"] = "all";
    /**
     * Create a new clause for each possible binding of variable.
     */
    QuantifierType["any"] = "any";
})(QuantifierType = exports.QuantifierType || (exports.QuantifierType = {}));
/**
 * Quantifier for allowing runtime expansion of expressions.
 */
class Quantifier {
    /**
     * Initializes a new instance of the `Quantifier` class.
     *
     * @param variable Name of variable to replace.
     * @param type Type of quantifier.
     * @param bindings Possible bindings for variable.
     */
    constructor(variable, type, bindings) {
        this.variable = variable;
        this.type = type;
        this.bindings = bindings;
    }
    /**
     * @returns A string that represents the quantifier.
     */
    toString() {
        return `${this.type} ${this.variable} ${this.bindings.length}`;
    }
}
exports.Quantifier = Quantifier;
//# sourceMappingURL=quantifier.js.map