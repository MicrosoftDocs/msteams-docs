---
title: Accessibility Guidelines for HTML Widgets in Teams
author: Suzanne Tocco
description: TODO
ms.topic: article
ms.date: 05/27/2026
---


# Accessibility guidelines for HTML widgets in Microsoft Teams 365

HTML widgets (MCP apps) allow partners to render custom HTML and JavaScript experiences inside a sandboxed `<iframe>` within Teams chat. Because these widgets appear inline with conversational content, they must meet a consistent accessibility bar so that all users, including those who use assistive technologies, can perceive, understand, and operate them.

This article describes the minimum accessibility requirements for HTML widgets and provides recommended best practices and testing guidance.

## Scope

These guidelines apply to all partner-built HTML widgets (MCP apps) that are rendered inside an `<iframe>` in Teams chat. The requirements are in addition to general web accessibility standards such as [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).

> [!TIP]
> If you are building your widget with React, we recommend using [Fluent UI React v9](https://storybooks.fluentui.dev/react/?path=/docs/concepts-introduction--docs) components and tokens. They implement accessible, Teams-compatible patterns out of the box and reduce the amount of custom accessibility work required. Fluent UI React v9 is not required — partners may use any framework or library as long as the accessibility requirements in this article are met.



## Responsibility model

Teams and partners share responsibility for accessibility. The following table clarifies what each party owns.

| Requirement &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Teams | Partner |
|-------------------------------------------|:-----:|:-------:|
| Widget container label (e.g. "Scout widget") | ✅ |   |
| Tab stop for widget container | ✅ |   |
| Tab order of message elements | ✅ |   |
| Focus into and out of the widget container | ✅ |   |
| Widget-level loading and error states | ✅ |   |
| Keyboard navigation inside widget |   | ✅ |
| ARIA labels for interactive elements |   | ✅ |
| Screen reader support for widget content |   | ✅ |
| Color contrast inside widget |   | ✅ |
| High contrast support inside widget |   | ✅ |
| Error handling for content inside widget |   | ✅ |




### Keyboard accessibility

> [!NOTE]
> Teams manages focus into and out of the widget container. The requirements below apply to keyboard navigation within the widget content only.

**Keyboard operability**: All interactive elements must be reachable and operable using standard keyboard input such as Tab, Shift+Tab, arrow keys, Enter, and Space, as appropriate for the control type.

**No focus traps**: Widgets must not trap focus. Users must be able to navigate through all interactive elements in a logical order and exit the widget without getting stuck.

**Visible focus**: All interactive elements must have a clear, visible focus indicator that meets contrast requirements and is not removed via CSS without an accessible replacement.

**Custom controls**: Custom widgets and controls must follow the keyboard interaction patterns defined in the [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for their respective roles (for example,`button`, `menu`, `dialog`, `listbox`).

**Dialogs and modals**: Modal dialogs and overlays are possible within a widget but are not recommended. Because widgets render inside a small iframe, a modal will be constrained to that space and may feel disorienting to users. If your use case requires a modal, consider whether the expanded surface would be a better fit for that interaction.
If you do implement a modal inside your widget, if you are using Fluent UI React v9 use the [Dialog](https://storybooks.fluentui.dev/react/?path=/docs/components-dialog--docs) or [Popover](https://storybooks.fluentui.dev/react/?path=/docs/components-popover--docs) components rather than a custom implementation, as they handle focus trapping, focus restoration, and ARIA attributes correctly out of the box. For custom modal behavior, [useModalAttributes](https://storybooks.fluentui.dev/react/?path=/docs/utilities-focus-management-usemodalattributes--docs)  is available.






**Focus restoration**: When an element is removed from the DOM after a user action (for example, after submitting a form or closing a panel), focus must be restored to a logical element rather than dropping to the document body. Use Fluent V9's [useRestoreFocusSource and useRestoreFocusTarget](https://storybooks.fluentui.dev/react/?path=/docs/utilities-focus-management-userestorefocussource--docs) hooks to handle this automatically.



<table>
<tr>
<th align="left">✅ Do</th>
<th align="left">❌ Don't</th>
</tr>
<tr>
<td>

- Use Fluent UI React v9 Dialog or Popover for modal experiences
- Restore focus to the triggering element after a dialog or panel closes

</td>
<td>

- Don't remove focus outlines without providing an accessible alternative
- Don't auto-advance focus between controls without a clear user action

</td>
</tr>
</table>

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


<table>
<tr>
<th align="left">✅ Do</th>
<th align="left">❌ Don't</th>
</tr>
<tr>
<td>

- Use headings (`<h1>`–`<h3>`) to structure content and help screen reader users navigate
- Treat the widget as a self-contained web application — don't rely on Teams to provide roles or labels for content inside the iframe

</td>
<td>

- Don't use generic `<div>` or `<span>` elements as controls without roles and labels
- Don't override correct native semantics with ARIA when native elements already provide the needed behavior

</td>
</tr>
</table>




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

Test your widget in Windows High Contrast Mode and ensure that interactive elements, focus indicators, and key icons remain visible and understandable. While not required at submission, High Contrast support is strongly recommended to ensure your widget is usable by people who rely on this accessibility setting.

**Color independence**

Don't rely on color alone to convey meaning. Use text, icons, patterns, or other indicators in addition to color.

<table>
<tr>
<th align="left">✅ Do</th>
<th align="left">❌ Don't</th>
</tr>
<tr>
<td>

- Test in Windows High Contrast Mode before submission
- Pair color with a label or icon to communicate state
- Use [Fluent UI React v9 color tokens](https://storybooks.fluentui.dev/react/?path=/docs/theme-colors--docs) for backgrounds, borders, and text

</td>
<td>

- Don't use low-contrast text or icons for critical information
- Don't use placeholder text as the only label for an input
- Don't hardcode color values — use [Fluent UI React v9 color tokens](https://storybooks.fluentui.dev/react/?path=/docs/theme-colors--docs) or CSS variables so your widget adapts to Teams themes

</td>
</tr>
</table>


## Responsive layout and zoom

Widgets must adapt to the chat container and remain usable at different zoom levels and viewport sizes.

- **Zoom support:** Text and interactive controls must remain readable and operable at 200% browser zoom. Fixed-aspect content — such as data visualizations, embedded media, maps, or canvas-based rendering — is exempt where zoom would inherently distort the experience. In these cases, ensure the content remains accessible through alternative means such as descriptive alt text, data tables, or captions.
- **Flexible layout:** Avoid fixed pixel heights — allow the widget to grow vertically as needed so content isn't clipped.
- **No horizontal scrolling:** Layout should adapt to the narrow widths typical of chat containers.

  

## Motion, animation, and timing

Motion and animation must not cause discomfort or interfere with usability.

- **Reduced motion:** Respect the user's `prefers-reduced-motion` setting by reducing or disabling non-essential animations
- **Safe motion:** Avoid flashing content or rapid animations that could trigger photosensitive reactions
- **Auto-advancing content:** Don't auto-advance carousels or content without user input. If auto-advance is necessary, provide controls to pause, stop, and manually navigate



## Error handling inside the widget

> [!NOTE]
> Teams handles widget-level loading and error states. Partners are responsible for accessible error handling within their own widget content.


**Announcements**

Use `aria-live="assertive"` or an appropriate live region to announce critical errors to screen readers. If using Fluent UI React v9, use [useAnnounce](https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-useannounce--docs) with `polite: false` for error announcements.


**Clear messaging**

Error messages must:

- Describe what went wrong in clear, concise language
- Explain how the user can fix the issue or try again
  

**Input errors**

For invalid fields:

- Set `aria-invalid="true"` on the input
- Associate the error message with the input using `aria-describedby` or a similar mechanism


## Loading states inside the widget

> [!NOTE]
> Teams handles the widget-level loading state. The requirements below apply to any loading states that occur within your widget content after initial render.

- **Visible indicator:** Show a clear loading indicator when your widget fetches or processes data after initial render
- **Announcements:** Use `aria-live="polite"` to announce loading and completion states to screen readers. If using Fluent UI React v9, use [useAnnounce](https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-useannounce--docs) with `polite: true`
- **Focus behavior:** Don't trap focus during loading — users must still be able to move focus within the widget
- **Skeleton UI:** If you use skeleton screens, either hide them from assistive technologies using `aria-hidden="true"`, or provide meaningful labels that describe the loading state



## Minimum accessibility bar for submission

Widgets must meet all of the following requirements to be accepted. Widgets that don't meet this bar may be rejected or require remediation before publishing.

| Requirements |
|:---|
| ✅ Fully operable with a keyboard, with no focus traps inside the widget |
| ✅ Usable with screen readers, with meaningful roles, names, and states on all interactive elements |
| ✅ Meets WCAG 2.2 AA contrast ratios for text and essential UI elements |
| ✅ Provides accessible error handling and loading states for content inside the widget |
| ✅ Text and interactive controls remain readable and operable at 200% browser zoom (exceptions apply for fixed-aspect content such as charts, maps, and media) |
| ✅ Respects `prefers-reduced-motion` and avoids harmful flashing |
| ✅ Adapts to the chat container without requiring horizontal scrolling |

> [!WARNING]
> Widgets that don't meet these requirements may be rejected or require remediation before they can be published.


## Recommended best practices

The following practices aren't required but are strongly recommended to improve the overall experience.

- **Skip links:** Provide a "Skip to main content" link at the top of the widget to let keyboard and screen reader users bypass repeated navigation
- **Headings:** Use headings (`<h1>`–`<h3>`) to structure content and make navigation easier for screen reader users
- **Simple interaction models:** Prefer simple, predictable interaction patterns over highly custom or novel controls
- **Scrolling:** Avoid complex nested scroll regions. If a scrollable region is necessary, ensure it has a clear label and is keyboard accessible
- **Tooltips:** Implement accessible tooltips using `aria-describedby` and ensure they're available on focus as well as hover
- **Tooltips:** Use [Fluent UI React v9 ](https://storybooks.fluentui.dev/react/?path=/docs/concepts-introduction--docs) components wherever possible — they implement accessible patterns out of the box and reduce the amount of custom accessibility work required


## Testing guidance

Partners should validate accessibility using a combination of automated and manual testing before submission. Because widgets run inside a sandboxed iframe, some automated tools may not scan iframe content by default — open your widget content directly in a browser tab to get accurate results from automated tools.


### Automated testing tools

| Tool | Type | Notes |
|---|---|---|
| [Lighthouse](https://developer.chrome.com/docs/lighthouse) | Browser (Chrome DevTools) | Built into Chrome — good starting point for catching common issues. No install required. |
| [axe DevTools](https://www.deque.com/axe/devtools/) | Browser extension | More detailed accessibility analysis than Lighthouse. Free version available. |
| [WAVE](https://wave.webaim.org/extension/) | Browser extension | Visual overlay that highlights issues directly on the page. Good for quick visual checks. |
| [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) | Desktop tool | Checks contrast ratios for text and UI elements against WCAG standards. |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Web-based | Quick browser-based contrast ratio checker. No install required. |


### Manual testing tools

| Test type | What to verify |
|---|---|
| Keyboard-only | Navigate the entire widget using only the keyboard. Verify no focus traps and a logical tab order throughout. |
| Screen reader | Test with at least one screen reader — Narrator or NVDA on Windows, VoiceOver on Mac. Verify all elements are announced meaningfully. |
| High contrast | Enable Windows High Contrast Mode and verify that content, controls, and focus indicators remain visible. |
| Zoom | Increase browser zoom to 200% and confirm content and functionality are fully preserved. |
| Reduced motion | Enable reduced motion in OS settings and verify animations are minimized or disabled. |
| Responsive | Test in narrow viewports representative of Teams chat container widths. |


## Related content

- [HTML widgets overview for Microsoft Teams](#)
- [UX guidelines for HTML widgets in Microsoft Teams](#)
- [Teams store validation guidelines](#)
- [Fluent UI React v9](https://storybooks.fluentui.dev/react/?path=/docs/concepts-introduction--docs)
- [Fluent UI React v9 components](https://react.fluentui.dev/)
- [WCAG 2.2 contrast requirements](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
