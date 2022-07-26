declare module 'adaptivecards-templating/template-engine' {
	import * as AEL from 'adaptivecards-templating/adaptive-expressions';
	/**
	 * Holds global settings that can be used to customize the way templates are expanded.
	 */
	export class GlobalSettings {
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
	    static getUndefinedFieldValueSubstitutionString?: (path: string) => string | undefined;
	}
	/**
	 * Holds the context used to expand a template.
	 */
	export interface IEvaluationContext {
	    /**
	     * The root data object the template will bind to. Expressions that refer to $root in the template payload
	     * map to this field. Initially, $data also maps to $root.
	     */
	    $root: any;
	}
	/**
	 * Represents a template that can be bound to data.
	 */
	export class Template {
	    private static prepare;
	    private static internalTryEvaluateExpression;
	    /**
	     * Parses an interpolated string into an Expression object ready to evaluate.
	     *
	     * @param interpolatedString The interpolated string to parse. Example: "Hello ${name}"
	     * @returns An Expression object if the provided interpolated string contained at least one expression (e.g. "${expression}"); the original string otherwise.
	     */
	    static parseInterpolatedString(interpolatedString: string): AEL.Expression | string;
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
	    static tryEvaluateExpression(expression: AEL.Expression, context: IEvaluationContext, allowSubstitutions: boolean): {
	        value: any;
	        error: string;
	    };
	    private _context;
	    private _preparedPayload;
	    private expandSingleObject;
	    private internalExpand;
	    /**
	     * Initializes a new Template instance based on the provided payload.
	     * Once created, the instance can be bound to different data objects
	     * in a loop.
	     *
	     * @param payload The template payload.
	     */
	    constructor(payload: any);
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
	    expand(context: IEvaluationContext): any;
	}

}
declare module 'adaptivecards-templating/json-schema-card' {
	import { IAdaptiveCard } from 'adaptivecards-templating/adaptivecards/src/schema';
	import { JSONSchema7 } from 'adaptivecards-templating/json-schema';
	export function JSONSchemaCard(schema: JSONSchema7): IAdaptiveCard | undefined;

}
declare module 'adaptivecards-templating/adaptivecards-templating' {
	export * from 'adaptivecards-templating/template-engine';
	export * from 'adaptivecards-templating/json-schema-card';

}
