import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';
/**
 * Registers keyframe definitions.
 *
 * @public
 */
export function keyframes(timeline) {
    var stylesheet = Stylesheet.getInstance();
    var name = stylesheet.getClassName();
    var rulesArray = [];
    for (var prop in timeline) {
        if (timeline.hasOwnProperty(prop)) {
            rulesArray.push(prop, '{', serializeRuleEntries(getStyleOptions(), timeline[prop]), '}');
        }
    }
    var rules = rulesArray.join('');
    stylesheet.insertRule("@keyframes " + name + "{" + rules + "}", true);
    stylesheet.cacheClassName(name, rules, [], ['keyframes', rules]);
    return name;
}
//# sourceMappingURL=keyframes.js.map