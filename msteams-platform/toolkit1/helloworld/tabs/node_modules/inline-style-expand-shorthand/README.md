# inline-style-expand-shorthand

Expanding shorthand properties in JavaScript style objects.

<img alt="npm downloads" src="https://img.shields.io/npm/dm/inline-style-expand-shorthand.svg"> <img alt="npm version" src="https://badge.fury.io/js/inline-style-expand-shorthand.svg"> <img alt="gzipped size" src="https://img.shields.io/bundlephobia/minzip/inline-style-expand-shorthand.svg?colorB=4c1&label=gzipped%20size">

## Installation

```sh
yarn add inline-style-expand-shorthand
```

Alternatively use `npm i --save inline-style-expand-shorthand`.

## Why?

When using a library that generates Atomic CSS such as [Fela](http://fela.js.org) or [Styletron](https://www.styletron.org), one can run into an issue where mixed shorthand and longhand properties are applied in an unexpected way due to the rendering order of CSS classes.

This packages helps to prevent those issues by always expanding shorthand values so that no conflicts occur at all.

## How?

As this library runs on the browser as well, it needs to be very small and performant. In order to achieve that, we renounced using complex parsing algorithms, but rather rely on a set of simple regular expressions.

This also comes with some downsides: We make a lot of consumptions about the CSS value. All in all, **it must be a valid CSS value**. Otherwise one might experience strange behaviour.

## Supported Properties

- border
- borderTop
- borderRight
- borderBottom
- borderLeft
- borderWidth
- borderStyle
- borderColor
- borderRadius
- padding
- margin
- outline
- flex
- textDecoration
- overflow

> Need more? Feel free to [create an issue](https://github.com/rofrischmann/inline-style-expand-shorthand/issues/new) with a proposal!

## Usage

This package exports 3 methods, one to expand single properties and two to expand properties on full style objects.

### expandProperty

| Parameter  | Description                                              |
| ---------- | -------------------------------------------------------- |
| property   | The property name (in camelCase) that should be expanded |
| value      | The value that is going to be expanded                   |

```js
import { expandProperty } from 'inline-style-expand-shorthand'

const longhands = expandProperty('padding', '10px 15px 5px')

// longhands === output
const output = {
  paddingTop: '10px',
  paddingRight: '15px',
  paddingBottom: '5px',
  paddingLeft: '15px',
}
```

### expand

This is just a convenient wrapper for objects that uses `expandProperty` under the hood.

| Parameter  | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| style      | A (nested) style objects that contains shorthand properties |

```js
import { expand } from 'inline-style-expand-shorthand'

const style = {
  padding: '10px 20px',
  borderLeft: '1px solid black',
}

const expanded = expand(style)

// expanded === output
const output = {
  paddingTop: '10px',
  paddingRight: '20px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'black',
}
```

### expandWithMerge

This one is similar to `expand` except that it also merges mixed longhand and shorthand properties.

> **Warning**: Beware that there are different border properties with the same specificity. In order to solve that deterministically, we had to choose a order. `borderWidth`, `borderStyle` and `borderColor` will always overwrite `borderLeft`, `borderRight`, `borderTop` and `borderBottom`.

| Parameter  | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| style      | A (nested) style objects that contains shorthand properties |

```js
import { expandWithMerge } from 'inline-style-expand-shorthand'

const style = {
  padding: '10px 20px',
  paddingLeft: '15px',
}

const expanded = expandWithMerge(style)

// expanded === output
const output = {
  paddingTop: '10px',
  paddingRight: '20px',
  paddingBottom: '10px',
  // overwrites the expanded padding-left value due to it being more specific
  paddingLeft: '15px',
}
```

## License

inline-style-expand-shorthand is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io).
