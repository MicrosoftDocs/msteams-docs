---
title: Design your app - Colors
description: Learn about the basics of colors and color schemes in your Microsoft Teams app, including avatars, layout, icons, color scheme, and more.
author: heath-hamilton
ms.localizationpriority: medium
ms.author: lajanuar
ms.topic: Colors
---
# Colors for your Microsoft Teams app

Teams web and desktop supports default (light), dark, and high-contrast themes, while Teams mobile supports light and dark themes. Each theme has its own color scheme.

## Guidelines

Using standard Teams colors, which are designed to meet Web Content Accessibility Guidelines (WCAG) 2.1 contrast requirements, ensures a consistent, accessible experience across the supported themes.

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\colors-guideline-1.png" alt-text="Example shows the guideline to add colors when necessary.":::

##### Add colors when necessary

Start from a white canvas and add colors only if needed. Avoid using colors to paint large surfaces such as cards. Instead, use them to create hierarchy (for example, highlighting important actions).

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\colors-guideline-2.png" alt-text="Example shows the guideline to put accessibility first.":::

##### Put accessibility first

Always aim to present app content with all user needs and preferences in mind. The color of text and important elements such as icons must be accessible.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\colors-guideline-3.png" alt-text="Example shows the guideline to use colors consistently. ":::

##### Use colors consistently

Don’t confuse people by using colors inconsistently. Make use of Teams core colors and secondary colors, which convey activity, errors, and other common states.

   :::column-end:::
:::row-end:::

### Primary colors and color tokens

Each Teams theme has its own color scheme. To handle theme changes automatically, you can specify color tokens in your design. The following token values are for the default (light) theme.

Learn how to [use color tokens in your Teams app project](https://fluentsite.z22.web.core.windows.net/colors).

##### Example design with tokens

:::image type="content" source="../..\assets\images\design-guidelines\colors-design-token-example.png" alt-text="Example shows the light theme color tokens. ":::

|Counter|Description|
|----------|-----------|
|A|Background 2: Canvas background color|
|B|Default Foreground: Primary text color|
|C|Foreground 1: Secondary text color|
|D|Brand Background: Primary button background color|
|E|Brand Foreground: Link text color|

### Integrate your app’s color palette with Teams

##### Primary color

:::image type="content" source="../..\assets\images\design-guidelines\colors-primary-color-usage.png" alt-text="Example shows an app screen with primary color usage.":::

|Counter|Description|
|----------|-----------|
|1|Action button color in an embedded component|
|2|Action button color in a personal app|

##### Apply the primary color

:::image type="content" source="../..\assets\images\design-guidelines\colors-primary-color-apply.png" alt-text="Example shows the benefits of applying primary colors.":::

##### Secondary colors

:::image type="content" source="../..\assets\images\design-guidelines\secondary-color.png" alt-text="Example shows the application of secondary colors.":::

|Counter|Description|
|----------|-----------|
|1|Teams secondary colors|
|2|Custom secondary colors in an example app|

### Best Practices

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\color-purpose-do.png" alt-text="Example shows the use of colors with purpose.":::

#### Do: Use colors with purpose

Colors must be used for highlighting functionality, defining hierarchy, and conveying different states. Avoid using colors when not tied to any semantic meaning.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\natural-color-pallette.png" alt-text="Example shows the use of natural color palette.":::

#### Do: Use the neutral color palette to create depth

Always use the neutral, gray scale color palette provided in this kit as the base of your UI. You can include additional steps of gray to reinforce a sense of depth and hierarchy. Layers should appear brighter as they move up the z-axis.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\hero-card.png" alt-text="Example shows a hero card to indicate wrong color usage":::

#### Don’t: Use color for branding only

Don’t use colors just for branding purposes or visual delight. Avoid using colors on large surfaces, such as the background of cards and headers.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\light-dark-theme-dont.png" alt-text="Example shows an example of different shades of gray for light and dark theme.":::

#### Don’t: Get too complicated

For example, don’t have different shades of gray for light and dark theme. Also, on large surfaces, never use neutral colors that aren’t gray scale.

   :::column-end:::
:::row-end:::
