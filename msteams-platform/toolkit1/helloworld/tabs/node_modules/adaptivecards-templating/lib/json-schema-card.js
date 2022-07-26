"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSchemaCard = void 0;
// JSON Schema Card
// generates an Adaptive Card given a JSON schema
function JSONSchemaCard(schema) {
    try {
        return {
            type: "AdaptiveCard",
            body: [
                JSONSchemaCardObject(schema, '', 0),
            ],
        };
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
exports.JSONSchemaCard = JSONSchemaCard;
// JSON Schema Elements
function JSONSchemaCardElement(schema, path, depth) {
    if (typeof (schema) === "boolean")
        return null;
    switch (schema.type) {
        case "array":
            if (Array.isArray(schema.items)) {
                return JSONSchemaCardTuple(schema, path, depth);
            }
            else {
                return JSONSchemaCardList(schema, path, depth);
            }
        case "object":
            return JSONSchemaCardObject(schema, path, depth);
        case "boolean":
            return JSONSchemaCardBoolean(schema, path);
        case "integer":
        case "number":
            return JSONSchemaCardNumber(schema, path);
        case "string":
            if (schema.enum) {
                return JSONSchemaCardChoiceSet(schema, path);
            }
            else {
                return JSONSchemaCardText(schema, path);
            }
        case "date-time":
        case "time":
        case "date":
            return JSONSchemaCardTime(schema, path);
        default:
            return null;
    }
}
function encodeProperty(property) {
    return encodeURIComponent(property).replace('.', '%2e');
}
function textSizeAtDepth(depth) {
    switch (depth) {
        case 0:
            "large";
        case 1:
            "medium";
        default:
            "small";
    }
}
function JSONSchemaFieldTitle(schema, path, depth) {
    return [
        schema.title ? {
            type: "TextBlock",
            size: textSizeAtDepth(depth),
            text: schema.title,
        } : null,
        schema.description ? {
            type: "TextBlock",
            size: textSizeAtDepth(depth + 1),
            isSubtle: true,
            wrap: true,
            text: schema.description,
        } : null,
    ];
}
function JSONSchemaCardTuple(schema, path, depth) {
    var _a, _b;
    if (!Array.isArray(schema.items))
        return null;
    return {
        type: "Container",
        items: __spreadArray(__spreadArray([], JSONSchemaFieldTitle(schema, path, depth)), (_b = (_a = schema.items) === null || _a === void 0 ? void 0 : _a.map(function (item, idx) {
            return JSONSchemaCardElement(item, path + "[" + idx + "]", depth + 1);
        })) !== null && _b !== void 0 ? _b : []),
    };
}
function JSONSchemaCardList(schema, path, depth) {
    return {
        type: "Container",
        items: __spreadArray([], JSONSchemaFieldTitle(schema, path, depth)),
    };
}
function JSONSchemaCardObject(schema, path, depth) {
    var _a, _b;
    return {
        type: "Container",
        items: __spreadArray(__spreadArray([], JSONSchemaFieldTitle(schema, path, depth)), (_b = (_a = schema.required) === null || _a === void 0 ? void 0 : _a.map(function (property) {
            return JSONSchemaCardElement(schema.properties[property], path + "." + encodeProperty(property), depth + 1);
        })) !== null && _b !== void 0 ? _b : []),
    };
}
function JSONSchemaCardBoolean(schema, path) {
    return {
        type: "Input.Toggle",
        id: path,
        title: schema.title,
        label: schema.description,
        value: schema.default,
    };
}
function JSONSchemaCardNumber(schema, path) {
    var _a, _b;
    return {
        type: "Input.Number",
        id: path,
        title: schema.title,
        placeholder: schema.description,
        value: schema.default,
        min: (_a = schema.exclusiveMinimum) !== null && _a !== void 0 ? _a : schema.minimum,
        max: (_b = schema.exclusiveMaximum) !== null && _b !== void 0 ? _b : schema.maximum,
    };
}
function JSONSchemaCardChoiceSet(schema, path) {
    return {
        type: "Input.ChoiceSet",
        id: path,
        title: schema.title,
        choices: schema.enum.map(function (item) {
            return {
                title: item,
                value: item,
            };
        }),
        placeholder: schema.description,
        value: schema.default,
    };
}
function JSONSchemaCardText(schema, path) {
    return {
        type: "Input.Text",
        id: path,
        title: schema.title,
        placeholder: schema.description,
        value: schema.default,
        maxLength: schema.maxLength,
        regex: schema.pattern,
    };
}
function JSONSchemaCardTime(schema, path) {
    return {
        type: "Input.Time",
        id: path,
        title: schema.title,
        placeholder: schema.description,
        value: schema.default,
    };
}
//# sourceMappingURL=json-schema-card.js.map