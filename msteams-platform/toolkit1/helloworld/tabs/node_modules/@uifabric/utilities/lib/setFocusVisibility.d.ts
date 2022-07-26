export declare const IsFocusVisibleClassName = "ms-Fabric--isFocusVisible";
export declare const IsFocusHiddenClassName = "ms-Fabric--isFocusHidden";
/**
 * Sets the visibility of focus styling.
 *
 * By default, focus styles (the box surrounding a focused Button, for example) only show up when navigational
 * keypresses occur (through Tab, arrows, PgUp/PgDn, Home and End), and are hidden when mouse interactions occur.
 * This API provides an imperative way to turn them on/off.
 *
 * A use case might be when you have a keypress like ctrl-f6 navigate to a particular region on the page,
 * and want focus to show up.
 *
 * @param enabled - whether to remove or add focus
 * @param target - optional target
 */
export declare function setFocusVisibility(enabled: boolean, target?: Element): void;
