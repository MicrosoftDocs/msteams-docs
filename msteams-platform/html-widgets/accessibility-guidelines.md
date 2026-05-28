---
title: Accessibility Guidelines for HTML Widgets in Teams
author: Suzanne Tocco
description: TODO
ms.topic: article
ms.date: 05/27/2026
---

TODO

# Accessibility guidelines for HTML widgets in Microsoft Teams 365

HTML widgets (MCP apps) allow partners to render custom HTML and JavaScript experiences inside a sandboxed `<iframe>` within Copilot chat. Because these widgets appear inline with conversational content, they must meet a consistent accessibility bar so that all users, including those who use assistive technologies, can perceive, understand, and operate them.

This article describes the minimum accessibility requirements for HTML widgets and provides recommended best practices and testing guidance.

## Scope

These guidelines apply to all partner-built HTML widgets (MCP apps) that are rendered inside an `<iframe>` in Teams chat. The requirements are in addition to general web accessibility standards such as [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).

## Responsibility model

Teams and partners share responsibility for accessibility. The following table clarifies what each party owns.

| Requirement                                  | Teams | Partner |
|----------------------------------------------|-------|---------|
| Widget container label (e.g. "Scout widget") | x     |         |
| Tab stop for widget container                | x     |         |
| Tab order of message elements                | x     |         |
| Focus into and out of the widget container   | x     |         |
| Widget-level loading and error states        | x     |         |
| Keyboard navigation inside widget            |       | x       |
| ARIA labels for interactive elements         |       | x       |
| Screen reader support for widget content     |       | x       |
| Color contrast inside widget                 |       | x       |
| High contrast support inside widget          |       | x       |
| Error handling for content inside widget     |       | x       |

### Keyboard accessibility

> [!IMPORTANT]
> Teams manages focus into and out of the widget container. The requirements below apply to keyboard navigation within the widget content only.

**Keyboard operability**: All interactive elements must be reachable and operable using standard keyboard input such as Tab, Shift+Tab, arrow keys, Enter, and Space, as appropriate for the control type.

**No focus traps**: Widgets must not trap focus. Users must be able to navigate through all interactive elements in a logical order and exit the widget without getting stuck.

**Visible focus**: All interactive elements must have a clear, visible focus indicator that meets contrast requirements and is not removed via CSS without an accessible replacement.

**Custom controls**: Custom widgets and controls must follow the keyboard interaction patterns defined in the [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for their respective roles (for example,`button`, `menu`, `dialog`, `listbox`).

**Dialogs and modals**: If your widget opens a modal dialog, use Fluent V9's [Dialog](https://storybooks.fluentui.dev/react/?path=/docs/components-dialog--docs) or [Popover](https://storybooks.fluentui.dev/react/?path=/docs/components-popover--docs) components rather than a custom implementation. These handle focus trapping, focus restoration, and ARIA attributes correctly out of the box. If you need custom modal behavior, use [useModalAttributes](https://storybooks.fluentui.dev/react/?path=/docs/utilities-focus-management-usemodalattributes--docs) and consult your accessibility champion before doing so.

**Focus restoration**: When an element is removed from the DOM after a user action (for example, after submitting a form or closing a panel), focus must be restored to a logical element rather than dropping to the document body. Use Fluent V9's [useRestoreFocusSource and useRestoreFocusTarget](https://storybooks.fluentui.dev/react/?path=/docs/utilities-focus-management-userestorefocussource--docs) hooks to handle this automatically.

Do:

- Use Fluent V9 Dialog or Popover for modal experiences
- Restore focus to the triggering element after a dialog or panel closes

Don't:

- Don't remove focus outlines without providing an accessible alternative
- Don't auto-advance focus between controls without a clear user action

## Screen reader semantics

Widgets must expose meaningful structure and semantics so that screen readers and other assistive technologies can correctly interpret and announce content.

**Semantic HTML**

Use native HTML elements whenever possible, such as `<button>`, `<input>`, `<label>`, `<ul>`, `<li>`, `<nav>`, and `<form>`.

**Role, name, state**

All interactive elements must have:

- A meaningful role (native or ARIA)
- An accessible name (visible text, `aria-label`, or `aria-labelledby`)
- Accurate state and property information (for example, `aria-expanded`, `aria-checked`, `aria-selected`, `aria-disabled`)

**Dynamic updates**

Use live regions to announce important changes to screen readers:

- `aria-live="polite"` for non-critical updates such as loading results
- `aria-live="assertive"` for critical updates such as errors

If you are using Fluent V9 and React, use [AriaLiveAnnouncer](https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-arialiveannouncer--docs) with the [useAnnounce](https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-useannounce--docs) hook rather than implementing raw aria-live regions. If your widget includes text inputs and needs to announce updates while the user is typing, use [useTypingAnnounce](https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-usetypingannounce--docs) instead.

**Images**

Images that convey meaning must include descriptive `alt` text. Decorative images should be marked with empty `alt=""` or hidden from assistive technologies.

Do:

- Use headings (`<h1>`–`<h3>`) to structure content and help screen reader users navigate
- Treat the widget as a self-contained web application — don't rely on Teams to provide roles or labels for content inside the iframe

Don't:

- Don't use generic `<div>` or `<span>` elements as controls without roles and labels
- Don't override correct native semantics with ARIA when native elements already provide the needed behavior

## Focus management

Because widgets are embedded in a conversational experience, focus behavior within the widget must be predictable and must not disrupt the user's workflow in chat.

**No focus stealing**

Widgets must not automatically move focus within the iframe when they load. Focus should remain where Teams has placed it until the user explicitly interacts with the widget.

**Initial focus**

When the user moves focus into the widget, focus should land on the first meaningful interactive element, not on a hidden or non-interactive element.

**Dialogs and overlays**

If the widget opens a modal dialog:

- Move focus into the dialog when it opens
- Trap focus within the dialog while it's open
- Return focus to the triggering element when the dialog closes

## Color, contrast, and high contrast mode

Widgets must remain perceivable in different contrast settings, including Windows High Contrast Mode.

**Text contrast**

Text and essential icons must meet [WCAG 2.2 AA contrast ratios](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html):

- At least 4.5:1 for normal text
- At least 3:1 for large text (18pt or 14pt bold and above)

**High contrast mode**

Ensure that interactive elements, focus indicators, and key icons remain visible and understandable when the user enables Windows High Contrast Mode.

**Color independence**

Don't rely on color alone to convey meaning. Use text, icons, patterns, or other indicators in addition to color.

Do:

- Test in Windows High Contrast Mode before submission
- Pair color with a label or icon to communicate state
- Use [Fluent UI React v9 color tokens](https://storybooks.fluentui.dev/react/?path=/docs/theme-colors--docs) for backgrounds, borders, and text

Don’t:

- Don't use low-contrast text or icons for critical information
- Don't use placeholder text as the only label for an input
- Don't hardcode color values — use [Fluent UI React v9 color tokens](https://storybooks.fluentui.dev/react/?path=/docs/theme-colors--docs) or CSS variables so your widget adapts to Teams themes
