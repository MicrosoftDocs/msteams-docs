/**
 * asAsync - a HOC for async loading components.
 *
 * Usage:
 *
 * const AsyncDialog = asAsync({
 *   load: () => import('Dialog').then(result => result.default),
 * });
 *
 * React.render(domElement, <AsyncDialog asyncPlaceholder={ () => <Spinner/> } { ...dialogProps } />);
 *
 * Note the `asyncPlaceholder` prop will be respected when rendering the async component and it hasn't
 * been loaded yet.
 */
import * as React from 'react';
export interface IAsAsyncOptions<TProps> {
    /**
     * Callback which returns a promise resolving an object which exports the component.
     */
    load: () => Promise<React.ElementType<TProps>>;
    /**
     * Callback executed when async loading is complete.
     */
    onLoad?: () => void;
    /**
     * Callback when async loading fails.
     */
    onError?: (error: Error) => void;
}
/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a module with a default export for the component.
 */
export declare function asAsync<TProps>(options: IAsAsyncOptions<TProps>): React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps & {
    asyncPlaceholder?: "symbol" | "object" | "text" | "table" | "ruby" | "small" | "input" | "progress" | "select" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "s" | "samp" | "script" | "section" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "big" | React.ComponentClass<any, any> | React.FunctionComponent<any> | "keygen" | "menuitem" | "noindex" | "webview" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | undefined;
}> & React.RefAttributes<React.ElementType<TProps>>>;
