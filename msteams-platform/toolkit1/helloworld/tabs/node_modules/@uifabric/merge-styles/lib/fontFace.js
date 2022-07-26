import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';
/**
 * Registers a font face.
 * @public
 */
export function fontFace(font) {
    Stylesheet.getInstance().insertRule("@font-face{" + serializeRuleEntries(getStyleOptions(), font) + "}", true);
}
//# sourceMappingURL=fontFace.js.map