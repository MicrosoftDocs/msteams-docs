---
title: Design your app - App icon for store and app bar
description: Learn about the app icons for store and app bar
author: heath-hamilton
ms.localizationpriority: medium
ms.author: lajanuar
ms.topic: App icon
---
# App icon for store and app bar

Quickly learn the guidelines for creating icons in our app ecosystem to help designers and developers submit the correct application icon. Following these guidelines creates uniformity and balance in our app ecosystem and emphasizes the artwork of your app icon.

## App icon

When submitting your app package, include two PNG versions of the app icon—a color icon and an outline icon. For your app to pass Teams store review, these icons must meet certain size requirements. Follow these steps to ensure your app icons fit the Teams store standard.

### Balanced layout

The icons are intended to create a uniform layout. These guidelines will help you create your app icon for submission.

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-balanced-layout.png" alt-text="Example shows the uniform layout for app icons..":::

### Creating your assets

Microsoft Teams needs three assets during app submission to generate the app icons:

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-assets-needed.png" alt-text="Example shows the three assets to generate app icons.":::

|Counter|Description|
|----------|-----------|
|1|A full bleed .PNG at 192x192 px. Utilize the full asset space as the background. This is used in the app store or flyouts.|
|2|A default or rest .PNG icon at 32x32 px. This icon is used as “rest/default” state in the app bar and other locations in the product. |
|3|A focus or pressed  .PNG icon at 32x32 px. This icon is used as “focus” state in the app bar.|

### Color icon architecture

The color app icon dimensions must be 192x192 pixels. If you have a logo icon, the logo needs to fit within the 120x120 safe area in the center.

The submitted icon should be a full square. Teams automatically applies masking for consistent icon shapes across the app.

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-color-architecture.png" alt-text="Example shows the color app icon dimensions of your logo icon.":::

### Icon attributes

#### Colored

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-color-attribute.png" alt-text="Example shows the icon attributes for a colored icon.":::

#### White background

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-attribute-white.png" alt-text="Example shows the color attributes for an icon with white background.":::

## App icon utilization

Reference this list for content areas where your icon will show in the product, depending on app type or capability.

### Personal app

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-personal-app.png" alt-text="Example shows the app icon in personal app.":::

### App flyout

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-app-flyout.png" alt-text="Example shows app icon in app flyout.":::

### Bot (channel view)

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-bot-channel-view.png" alt-text="Example shows an app icon in channel view of bot.":::

### Message extension flyout

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-message-extension.png" alt-text="Example shows an app icon in message extension flyout.":::

### Meeting apps flyout

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-meeting-apps.png" alt-text="Example shows an app icon in meeting app flyout.":::

### Meeting U-bar

:::image type="content" source="../..\assets\images\design-guidelines\app-icon-meeting-u-bar.png" alt-text="Example shows an app icon in meeting U-bar.":::

## Best practices

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\safe-area-do.png" alt-text="Example shows a logo within the safe area.":::

#### Do: Follow the recommendation for safe area (96x96)

It is recommended that if you have a logo, you keep it within the 96x96 safe area inside of the 192x192 .PNG icon.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\safe-area-dont.png" alt-text="Example shows a logo that is not within the safe area.":::

#### Don’t: Make the icon bigger than the safe area

Here is an example of a logo inside of the .PNG icon that is not within the safe area. It creates uneven padding (negative space) around the icon.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\round-corners-do.png" alt-text="Example shows an icon with full bleed.":::

#### Do: Provide full bleed, we will add the rounded corners

If you have a full bleed image, just upload a square .PNG at 192x192. We will round the corners for you dynamically.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\round-corners-dont.png" alt-text="Example shows an icon with rounder corners.":::

#### Don’t: Round the corners of your icon

Don’t round the corners. Just submit at perfect square at 192x192. We will round the corners for you dynamically.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-without-border-do.png" alt-text="Example shows an upload of icon without border.":::

#### Do: Upload an icon without a border

We will add the border automatically. In this case just upload your .PNG without a border, even if it’s on a white background.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-without-border-dont.png" alt-text="Example shows an upload of icon with a border.":::

#### Don’t: Add a border

We dynamically add borders. If you include a border in your .PNG, it will result in unwanted duplication on white backgrounds.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-contrast-do.png" alt-text="Example shows an app icon with enough contrast.":::

#### Do: Provide enough contrast

Please consider your icon to have enough contrast against the background. We recommend a ratio of 4.5:1 for best accessibility.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-contrast-dont.png" alt-text="Example shows an app icon which is faded.":::

#### Don’t: Fade the icon

Avoid low contrast for your icons. Make sure that the background and icon you use in your .PNG has enough contrast.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-elevate-brand-do.png" alt-text="Example shows an app icon with your brand elevated.":::

#### Do: Elevate your brand

Focus on your brand by using a full flat color as background.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-elevate-brand-dont.png" alt-text="Example shows an app icon with your brand in a circle.":::

#### Don’t: Avoid placing your brand icon in a circle

Elevate your brand by keeping the brand icon within 96x96 safe area.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-abbreviate-do.png" alt-text="Example shows an app icon with abbreviation..":::

#### Do: Abbreviate long words in the app icon

If you have a long app name, please try to abbreviate so that it’s easier to read when we bring your icon down to 32x32 size.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-abbreviate-dont.png" alt-text="Example shows an app icon with multiple words.":::

#### Don’t: Include multiple words in app icon

Avoid using multiple words on the icon. It will be impossible to read the text when the icon is at smaller sizes for example 32x32 or 36x36.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-balance-do.png "alt-text="Example shows a balanced app icon.":::

#### Do: Create balance (96x96)

Elevate your brand by keeping balance. Stick to the 96x96 safe area for a sense of equilibrium.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../..\assets\images\design-guidelines\icon-balance-dont.png" alt-text="Example shows a skewed or stretched app icon.":::

#### Don’t: Skew or stretch your icon

Keep your icon within the safe area. Don’t stretch your icon in one direction or another.

   :::column-end:::
:::row-end:::
