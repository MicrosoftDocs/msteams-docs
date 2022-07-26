/**
 * The helper functions here will make the target element as modal to screen readers, by placing aria-hidden on elements
 * that are siblings to the target element and the target element's ancestors (because aria-hidden gets inherited).
 * That way, all other elements on the page are hidden to the screen reader.
 */
import { getDocument } from './dom/getDocument';
/**
 * Call this on a target element to make it modal to screen readers.
 * Returns a function that undoes the changes it made.
 */
export function modalize(target) {
    var _a;
    var affectedNodes = [];
    var targetDocument = getDocument(target) || document;
    // start at target, then recurse and do the same for parent, until we reach <body>
    while (target !== targetDocument.body) {
        // grab all siblings of current element
        for (var _i = 0, _b = target.parentElement.children; _i < _b.length; _i++) {
            var sibling = _b[_i];
            // but ignore elements that are already aria-hidden
            if (sibling !== target && ((_a = sibling.getAttribute('aria-hidden')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'true') {
                affectedNodes.push(sibling);
            }
        }
        if (!target.parentElement) {
            break;
        }
        target = target.parentElement;
    }
    // take all those elements and set aria-hidden=true on them
    affectedNodes.forEach(function (node) {
        node.setAttribute('aria-hidden', 'true');
    });
    return function () {
        unmodalize(affectedNodes);
        affectedNodes = []; // dispose
    };
}
/**
 * Undoes the changes that modalize() did.
 */
function unmodalize(affectedNodes) {
    affectedNodes.forEach(function (node) {
        // set instead of removing in case other components explicitly set aria-hidden and do =="true" or =="false"
        node.setAttribute('aria-hidden', 'false');
    });
}
//# sourceMappingURL=modalize.js.map