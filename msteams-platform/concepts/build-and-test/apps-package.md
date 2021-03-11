---
title: Package your app
description: Learn how to package your Microsoft Teams app for testing, uploading, and store publishing.
ms.topic: conceptual
---

# Create an app package for your Microsoft Teams app

This document guides you on how to create your app package.

Apps in Teams are defined by an app manifest JSON file and bundled in an app package with their icons. You need an app package to upload and install your app in Teams and publish to the Teams store and AppSource.

A Teams app package is a .zip file containing the following:

* A manifest file named **manifest.json**, which specifies attributes of your app and points to needed resources for your experience. For example, location of the tab configuration page or the Microsoft app ID for the bot.
* [Color and outline icons for your app](#app-icons).

## App manifest

Your manifest file must be at the top level of the uploaded package with the name **manifest.json**. For Teams App Store and AppSource submission, use the current [manifest schema](~/resources/schema/manifest-schema.md).

## App icons

Your app package must include two PNG versions of your app icon: A color and outline version. 

> [!Note]
> If your app has a bot or messaging extension, the icons must be included in your [Microsoft Azure Bot Service registration](https://aka.ms/aadapplist).

For your app to pass Teams store review, these icons must meet the following size requirements:

### Color icon

The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. The icon symbol must be 96x96 pixels and can be any color. However, it must sit on a solid or fully transparent square background.

Teams automatically crops your icon to display a square with rounded corners in multiple scenarios and a hexagonal shape in bot scenarios. To crop the symbol without losing any detail, include 48 pixels of padding around your symbol.

:::image type="content" source="../../assets/images/icons/design-color-icon.png" alt-text="Teams icon color design guidance." border="false":::

### Outline icon

An outline icon displays in two scenarios:

* When your app is in use and hoisted on the left side of Teams app bar.
* When a user pins your app's messaging extension.

The icon must be 32x32 pixels. It can be white with a transparent background or transparent with a white background. No other colors are permitted. The outline icon must not have any extra padding around the symbol.

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

Samples of app icons that appear in different Teams capabilities and contexts.

#### Personal app

:::image type="content" source="../../assets/images/icons/personal-app-icon-example.png" alt-text="Example showing how an app icon looks in a personal app." border="false":::

#### Bot (channel)

:::image type="content" source="../../assets/images/icons/bot-icon-example.png" alt-text="Example showing how an app icon looks on a bot inside channel." border="false":::

#### Messaging extension

:::image type="content" source="../../assets/images/icons/messaging-extension-icon-example.png" alt-text="<alt text>" border="false":::

## See also
> [!div class="nextstepaction"]
> [Distribute your app](~/concepts/deploy-and-publish/overview.md)

## Next step

> [!div class="nextstepaction"]
> [Upload your app to Teams](~/concepts/deploy-and-publish/apps-upload.md)
> [!div class="nextstepaction"]
> [Publish your app to your organization](/MicrosoftTeams/tenant-apps-catalog-teams?toc=/microsoftteams/platform/toc.json&bc=/MicrosoftTeams/breadcrumb/toc.json
)
> [!div class="nextstepaction"]
> [Publish your app to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md
)
