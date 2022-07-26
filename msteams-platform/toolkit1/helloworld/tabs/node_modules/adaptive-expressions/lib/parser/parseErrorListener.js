"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: completed-docs
/**
 * Expression parser error listener.
 */
class ParseErrorListener {
    /**
     * Throws a syntax error based on the current context.
     *
     * @param _recognizer An Antlr4 runtime recognizer.
     * @param _offendingSymbol The token violating the lexer rules.
     * @param line The line number where the error occurred.
     * @param charPositionInLine The position of character in the line where the error occurred.
     * @param _msg The error message.
     * @param _e The `RecognitionException`.
     */
    syntaxError(_recognizer, _offendingSymbol, line, charPositionInLine, _msg, _e) {
        const syntaxErrorMessage = 'Invalid expression format.';
        throw Error(`syntax error at line ${line}:${charPositionInLine} ${syntaxErrorMessage}`);
    }
}
ParseErrorListener.Instance = new ParseErrorListener();
exports.ParseErrorListener = ParseErrorListener;
//# sourceMappingURL=parseErrorListener.js.map