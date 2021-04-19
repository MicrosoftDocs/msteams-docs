---
title: Package your app
description: Learn how to package your Microsoft Teams app for testing, uploading, and store publishing.
ms.topic: conceptual
---

# Create an app package for your Microsoft Teams app

Apps in Teams are defined by an app manifest JSON file, and bundled in an app package with their icons. You'll need an app package to upload and install your app in Teams and publish to either your Line of Business app catalog or to AppSource.

A Teams app package is a .zip file containing the following:

* A manifest file named `manifest.json`, which specifies attributes of your app and points to required resources for your experience, such the location of its tab configuration page or the Microsoft app ID for its bot.
* [Color and outline icons for your app](#app-icons).

## Creating a manifest

**Teams App Studio** can help configure your manifest. It also contains a React control library and configurable samples for cards. See [App Studio Overview](~/concepts/build-and-test/app-studio-overview.md).

Your manifest file must be named "manifest.json" and be at the top level of the upload package. Note that manifests and packages built previously might support an older version of the schema. For Teams apps and especially AppSource (formerly Office Store) submission, you must use the current [manifest schema](~/resources/schema/manifest-schema.md).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable IntelliSense or similar support from your code editor:
>
> `"$schema": "https://developer.microsoft.com/json-schemas/teams/v1.9/MicrosoftTeams.schema.json",`
 
## App icons

Your app package must include two PNG versions of your app icon—a color icon and an outline icon. For your app to pass the AppSource review, these icons must meet the following size requirements.

> [!Note]
> If your app has a bot or messaging extension, your icons also will be included in your Microsoft Azure Bot Service registration.

### Color icon

The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol (96x96 pixels) can be any color or colors, but it must sit on a solid or fully transparent square background.

Teams automatically crops your icon to display a square with rounded corners in multiple scenarios and a hexagonal shape in bot scenarios. Include 48 pixels of padding around your symbol so these crops can be made without losing any detail.

:::image type="content" source="../../assets/images/icons/design-color-icon.png" alt-text="Teams color icon design guidance." border="false":::

### Outline icon

An outline icon displays in two scenarios:

* When your app is in use and “hoisted” on the app bar on the left of Teams.
* when a user pins your app's messaging extension.

The icon must be 32x32 pixels. It can be white with a transparent background or transparent with a white background (no other colors are permitted). The outline icon should not have any extra padding around the symbol.

:::image type="content" source="../../assets/images/icons/design-outline-icon.png" alt-text="Teams color icon design guidance." border="false":::

### Best practices

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/icons/design-icon-do.png" alt-text="Illustration showing how to design your app icons." border="false":::

#### Do: Follow the precise outline icon guidelines

The RGB values of white used in your icon must be Red: 255, Green: 255, Blue: 255. All other parts of the outline icon must be fully transparent, with the alpha channel set to 0.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/icons/design-icon-dont.png" alt-text="Illustration showing how not to design your app icons." border="false":::

#### Don't: Crop in a circular or rounded square shape

The color icon submitted in your app package must be square. Don’t round the corners of your icon. Teams automatically adjusts the corner radius.

   :::column-end:::
:::row-end:::

### Examples

Here's how app icons appear in different Teams capabilities and contexts.

#### Personal app

:::image type="content" source="../../assets/images/icons/personal-app-icon-example.png" alt-text="Example showing how an app icon looks in a personal app." border="false":::

#### Bot (channel)

:::image type="content" source="../../assets/images/icons/bot-icon-example.png" alt-text="Example showing how an app icon looks on a bot inside channel." border="false":::

#### Messaging extension

:::image type="content" source="../../assets/images/icons/messaging-extension-icon-example.png" alt-text="<alt text>" border="false":::
