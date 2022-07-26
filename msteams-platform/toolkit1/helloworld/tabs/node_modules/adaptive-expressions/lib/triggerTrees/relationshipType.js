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
 * Relationship between trigger expressions.
 */
var RelationshipType;
(function (RelationshipType) {
    /**
     * First argument specializes the second, i.e. applies to a subset of the states the second argument covers.
     */
    RelationshipType["specializes"] = "specializes";
    /**
     * First and second argument are the same expression.
     */
    RelationshipType["equal"] = "equal";
    /**
     * First argument generalizes the second, i.e. applies to a superset of the states the second argument covers.
     */
    RelationshipType["generalizes"] = "generalizes";
    /**
     * Connot tell how the first and second arguments relate.
     */
    RelationshipType["incomparable"] = "incomparable";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
//# sourceMappingURL=relationshipType.js.map