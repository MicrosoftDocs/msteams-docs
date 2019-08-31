---
title: Design Guidelines Reference
description: Describes the guidelines for using fields and flyouts in your apps
keywords: teams design guidelines reference components fields and flyouts
---
# Fields and flyouts

---

## Fields

Fields are areas where users can input text.

### Padding and size

Single-line text fields are a fixed height of 32px to match the height of other components. Some text fields such as description fields may be taller vertically to allow more text.
[!include[Padding and size](~/includes/design/fields-image-padding.html)]

### States

These are the states of our text fields. Text fields exist in different states. We have specific designs dedicated to nine possible scenarios, including (top to bottom): Resting text field, Keyboard in focus and cursor inside the field, Keyboard in focus with text entered, Error handling has succeeded, Error handling has failed, Clear text field (including an X icon), Search field (including a Search icon), Loading field, and a Disabled field.
[!include[Field states](~/includes/design/fields-image-states.html)]

### Formatting help text and labels

Fields can contain placeholder text to give an example of the kind of information that is required. They can also hold labels that give the user more context. Within a field, your text should always be justified left. We use sentence casing throughout here, as well.

We use Segoe UI Regular at 12 pt (caption) and $app-gray-02 for labels. For help text, we use Segoe UI Regular at 14 pt (base) and $app-gray-02.
[!include[Fields typography](~/includes/design/fields-image-typography.html)]

---

## Flyouts

Flyouts are more lightweight than dialogs and can be dismissed quickly. They can contain buttons, fields, and other components.
[!include[Flyouts](~/includes/design/flyouts-image.html)]

### Sizing and padding

We recommend a 16px padding to the left and right of the content.
[!include[Flyouts size and padding](~/includes/design/flyouts-image-sizepadding.html)]

### Placement

Flyouts are contextual and should be placed above, below, or beside the element that triggered it.

### Scrolling

The header remains in place to give context to the content being scrolled.
[!include[Flyouts scrolling](~/includes/design/flyouts-image-scrolling.html)]

## Mobile

Fields are text-entry boxes that accept input from users. Flyout menus are horizontal pop-up windows that appear from the top pane and can be used to show more detail about an item.

### Field Controls

[!include[Mobile fields](~/includes/design/fields-mobile-image.html)]

### Flyout menu list controls

[!include[Mobile flyout menu controls](~/includes/design/flyout-menu-mobile-image.html)]
