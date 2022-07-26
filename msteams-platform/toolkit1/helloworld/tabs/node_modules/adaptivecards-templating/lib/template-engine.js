"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.GlobalSettings = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var AEL = require("adaptive-expressions");
var EvaluationContext = /** @class */ (function () {
    function EvaluationContext(context) {
        this._stateStack = [];
        if (context !== undefined) {
            this.$root = context.$root;
        }
    }
    EvaluationContext.prototype.isReservedField = function (name) {
        return EvaluationContext._reservedFields.indexOf(name) >= 0;
    };
    EvaluationContext.prototype.saveState = function () {
        this._stateStack.push({
            $data: this.$data,
            $index: this.$index
        });
    };
    EvaluationContext.prototype.restoreLastState = function () {
        if (this._stateStack.length === 0) {
            throw new Error("There is no evaluation context state to restore.");
        }
        var savedContext = this._stateStack.pop();
        this.$data = savedContext.$data;
        this.$index = savedContext.$index;
    };
    Object.defineProperty(EvaluationContext.prototype, "$data", {
        get: function () {
            return this._$data !== undefined ? this._$data : this.$root;
        },
        set: function (value) {
            this._$data = value;
        },
        enumerable: false,
        configurable: true
    });
    EvaluationContext._reservedFields = ["$data", "$when", "$root", "$index"];
    return EvaluationContext;
}());
var TemplateObjectMemory = /** @class */ (function () {
    function TemplateObjectMemory() {
        this._memory = new AEL.SimpleObjectMemory(this);
    }
    TemplateObjectMemory.prototype.getValue = function (path) {
        var actualPath = (path.length > 0 && path[0] !== "$") ? "$data." + path : path;
        return this._memory.getValue(actualPath);
    };
    TemplateObjectMemory.prototype.setValue = function (path, input) {
        this._memory.setValue(path, input);
    };
    TemplateObjectMemory.prototype.version = function () {
        return this._memory.version();
    };
    return TemplateObjectMemory;
}());
/**
 * Holds global settings that can be used to customize the way templates are expanded.
 */
var GlobalSettings = /** @class */ (function () {
    function GlobalSettings() {
    }
    /**
     * Callback invoked when expression evaluation needs the value of a field in the source data object
     * and that field is undefined or null. By default, expression evaluation will substitute an undefined
     * field with its binding expression (e.g. `${field}`). This callback makes it possible to customize that
     * behavior.
     *
     * **Example**
     * Given this data object:
     *
     * ```json
     * {
     *     firstName: "David"
     * }
     * ```
     *
     * The expression `${firstName} ${lastName}` will evaluate to "David ${lastName}" because the `lastName`
     * field is undefined.
     *
     * Now let's set the callback:
     * ```typescript
     * GlobalSettings.getUndefinedFieldValueSubstitutionString = (path: string) => { return "<undefined value>"; }
     * ```
     *
     * With that, the above expression will evaluate to "David &lt;undefined value&gt;"
     */
    GlobalSettings.getUndefinedFieldValueSubstitutionString = undefined;
    return GlobalSettings;
}());
exports.GlobalSettings = GlobalSettings;
/**
 * Represents a template that can be bound to data.
 */
var Template = /** @class */ (function () {
    /**
     * Initializes a new Template instance based on the provided payload.
     * Once created, the instance can be bound to different data objects
     * in a loop.
     *
     * @param payload The template payload.
     */
    function Template(payload) {
        this._preparedPayload = Template.prepare(payload);
    }
    Template.prepare = function (node) {
        if (typeof node === "string") {
            return Template.parseInterpolatedString(node);
        }
        else if (typeof node === "object" && node !== null) {
            if (Array.isArray(node)) {
                var result = [];
                for (var _i = 0, node_1 = node; _i < node_1.length; _i++) {
                    var item = node_1[_i];
                    result.push(Template.prepare(item));
                }
                return result;
            }
            else {
                var keys = Object.keys(node);
                var result = {};
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    result[key] = Template.prepare(node[key]);
                }
                return result;
            }
        }
        else {
            return node;
        }
    };
    Template.internalTryEvaluateExpression = function (expression, context, allowSubstitutions) {
        var memory = new TemplateObjectMemory();
        memory.$root = context.$root;
        memory.$data = context.$data;
        memory.$index = context.$index;
        var options = undefined;
        if (allowSubstitutions) {
            options = new AEL.Options();
            options.nullSubstitution = function (path) {
                var substitutionValue = undefined;
                if (GlobalSettings.getUndefinedFieldValueSubstitutionString) {
                    substitutionValue = GlobalSettings.getUndefinedFieldValueSubstitutionString(path);
                }
                return substitutionValue ? substitutionValue : "${" + path + "}";
            };
        }
        // The root of an expression coming from an interpolated string is of type Concat.
        // In that case, and if the caller allows it, we're doing our own concatenation
        // in order to catch each individual expression evaluation error and substitute in
        // the final string
        if (expression.type === AEL.ExpressionType.Concat && allowSubstitutions) {
            var result = "";
            for (var _i = 0, _a = expression.children; _i < _a.length; _i++) {
                var childExpression = _a[_i];
                var evaluationResult = void 0;
                try {
                    evaluationResult = childExpression.tryEvaluate(memory, options);
                }
                catch (ex) {
                    // We'll swallow all exceptions here
                    evaluationResult = {
                        value: undefined,
                        error: ex
                    };
                }
                if (evaluationResult.error) {
                    evaluationResult.value = "${" + childExpression.toString() + "}";
                }
                result += evaluationResult.value.toString();
            }
            return { value: result, error: undefined };
        }
        return expression.tryEvaluate(memory, options);
    };
    /**
     * Parses an interpolated string into an Expression object ready to evaluate.
     *
     * @param interpolatedString The interpolated string to parse. Example: "Hello ${name}"
     * @returns An Expression object if the provided interpolated string contained at least one expression (e.g. "${expression}"); the original string otherwise.
     */
    Template.parseInterpolatedString = function (interpolatedString) {
        var lookup = function (type) {
            var standardFunction = AEL.ExpressionFunctions.standardFunctions.get(type);
            if (standardFunction) {
                return standardFunction;
            }
            else {
                return new AEL.ExpressionEvaluator(type, function (expression, state, options) { throw new Error("Unknown function " + type); }, AEL.ReturnType.String);
            }
        };
        // If there is at least one expression start marker, let's attempt to convert into an expression
        if (interpolatedString.indexOf("${") >= 0) {
            var parsedExpression = AEL.Expression.parse("`" + interpolatedString + "`", lookup);
            if (parsedExpression.type === "concat") {
                if (parsedExpression.children.length === 1 && !(parsedExpression.children[0] instanceof AEL.Constant)) {
                    // The concat contains a single child that isn't a constant, thus the original
                    // string was a single expression. When evaluated, we want it to produce the type
                    // of that single expression
                    return parsedExpression.children[0];
                }
                else if (parsedExpression.children.length === 2) {
                    var firstChild = parsedExpression.children[0];
                    if (firstChild instanceof AEL.Constant && firstChild.value === "" && !(parsedExpression.children[1] instanceof AEL.Constant)) {
                        // The concat contains 2 children, and the first one is an empty string constant and the second isn't a constant.
                        // From version 4.10.3, AEL always inserts an empty string constant in all concat expression. Thus the original
                        // string was a single expression in this case as well. When evaluated, we want it to produce the type
                        // of that single expression.
                        return parsedExpression.children[1];
                    }
                }
                // Otherwise, we want the expression to produce a string
                return parsedExpression;
            }
        }
        // If the original string didn't contain any expression, return i as is
        return interpolatedString;
    };
    /**
     * Tries to evaluate the provided expression using the provided context.
     *
     * @param expression The expression to evaluate.
     * @param context The context (data) used to evaluate the expression.
     * @param allowSubstitutions Indicates if the expression evaluator should substitute undefined value with a default
     *   string or the value returned by the GlobalSettings.getUndefinedFieldValueSubstitutionString callback.
     * @returns An object representing the result of the evaluation. If the evaluation succeeded, the value property
     *   contains the actual evaluation result, and the error property is undefined. If the evaluation fails, the error
     *   property contains a message detailing the error that occurred.
     */
    Template.tryEvaluateExpression = function (expression, context, allowSubstitutions) {
        return Template.internalTryEvaluateExpression(expression, new EvaluationContext(context), allowSubstitutions);
    };
    Template.prototype.expandSingleObject = function (node) {
        var result = {};
        var keys = Object.keys(node);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (!this._context.isReservedField(key)) {
                var value = this.internalExpand(node[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        }
        return result;
    };
    Template.prototype.internalExpand = function (node) {
        var result;
        this._context.saveState();
        if (Array.isArray(node)) {
            var itemArray = [];
            for (var _i = 0, node_2 = node; _i < node_2.length; _i++) {
                var item = node_2[_i];
                var expandedItem = this.internalExpand(item);
                if (expandedItem !== null) {
                    if (Array.isArray(expandedItem)) {
                        itemArray = itemArray.concat(expandedItem);
                    }
                    else {
                        itemArray.push(expandedItem);
                    }
                }
            }
            result = itemArray;
        }
        else if (node instanceof AEL.Expression) {
            var evaluationResult = Template.internalTryEvaluateExpression(node, this._context, true);
            if (!evaluationResult.error) {
                result = evaluationResult.value;
            }
            else {
                throw new Error(evaluationResult.error);
            }
        }
        else if (typeof node === "object" && node !== null) {
            var when = node["$when"];
            var dataContext = node["$data"];
            var dataContextIsArray = false;
            var dataContexts = void 0;
            if (dataContext === undefined) {
                dataContexts = [undefined];
            }
            else {
                if (dataContext instanceof AEL.Expression) {
                    var evaluationResult = Template.internalTryEvaluateExpression(dataContext, this._context, true);
                    if (!evaluationResult.error) {
                        dataContext = evaluationResult.value;
                    }
                    else {
                        throw new Error(evaluationResult.error);
                    }
                }
                if (Array.isArray(dataContext)) {
                    dataContexts = dataContext;
                    dataContextIsArray = true;
                }
                else {
                    dataContexts = [dataContext];
                }
            }
            result = [];
            for (var i = 0; i < dataContexts.length; i++) {
                if (dataContextIsArray) {
                    this._context.$index = i;
                }
                if (dataContexts[i] !== undefined) {
                    this._context.$data = dataContexts[i];
                }
                var dropObject = false;
                if (when instanceof AEL.Expression) {
                    var evaluationResult = Template.internalTryEvaluateExpression(when, this._context, false);
                    var whenValue = false;
                    // If $when fails to evaluate or evaluates to anything but a boolean, consider it is false
                    if (!evaluationResult.error) {
                        whenValue = typeof evaluationResult.value === "boolean" && evaluationResult.value;
                    }
                    dropObject = !whenValue;
                }
                if (!dropObject) {
                    var expandedObject = this.expandSingleObject(node);
                    if (expandedObject !== null) {
                        result.push(expandedObject);
                    }
                }
            }
            if (result.length === 0) {
                result = null;
            }
            else if (result.length === 1) {
                result = result[0];
            }
        }
        else {
            result = node;
        }
        this._context.restoreLastState();
        return result;
    };
    /**
     * Expands the template using the provided context. Template expansion involves
     * evaluating the expressions used in the original template payload, as well as
     * repeating (expanding) parts of that payload that are bound to arrays.
     *
     * Example:
     *
     * ```typescript
     * let context = {
     *     $root: {
     *         firstName: "John",
     *         lastName: "Doe",
     *         children: [
     *             { fullName: "Jane Doe", age: 9 },
     *             { fullName: "Alex Doe", age: 12 }
     *         ]
     *     }
     * }
     *
     * let templatePayload = {
     *     type: "AdaptiveCard",
     *     version: "1.2",
     *     body: [
     *         {
     *             type: "TextBlock",
     *             text: "${firstName} ${lastName}"
     *         },
     *         {
     *             type: "TextBlock",
     *             $data: "${children}",
     *             text: "${fullName} (${age})"
     *         }
     *     ]
     * }
     *
     * let template = new Template(templatePayload);
     *
     * let expandedTemplate = template.expand(context);
     * ```
     *
     * With the above code, the value of `expandedTemplate` will be
     *
     * ```json
     * {
     *     type: "AdaptiveCard",
     *     version: "1.2",
     *     body: [
     *         {
     *             type: "TextBlock",
     *             text: "John Doe"
     *         },
     *         {
     *             type: "TextBlock",
     *             text: "Jane Doe (9)"
     *         },
     *         {
     *             type: "TextBlock",
     *             text: "Alex Doe (12)"
     *         }
     *     ]
     * }
     * ```
     *
     * @param context The context to bind the template to.
     * @returns A value representing the expanded template. The type of that value
     *   is dependent on the type of the original template payload passed to the constructor.
     */
    Template.prototype.expand = function (context) {
        this._context = new EvaluationContext(context);
        return this.internalExpand(this._preparedPayload);
    };
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template-engine.js.map