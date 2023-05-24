---
title: Package your app
description: Learn how to package your Microsoft Teams app and upload it to Teams. Create app package, enable custom uploading, ensure your app is running and accessible using HTTPs.
ms.localizationpriority: high
ms.topic: conceptual
---

# Create Teams app package

You need an app package, however, you plan to distribute your Microsoft Teams app. A valid package is a ZIP file (compressed (zipped) folder) that contains the following:

* **App manifest**: Describes how your app is configured, including its capabilities, required resources, and other important attributes.
* **App icons**: Each package requires a color and outline icon for your app.

## Teams doesn't host your app

When a user installs your app in Teams, they install an app package that contains only a configuration file (also known as an app manifest) and your app's icons. The app's logic and data storage are hosted elsewhere, such as on localhost during development and Azure Web Services. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app":::

## App manifest

Your app manifest file must be at the top level of the package with the name `manifest.json`.

When publishing to the Teams store, make sure your manifest references to the latest [schema](~/resources/schema/manifest-schema.md).

## App icons

Your app package must include two .png versions of your app icon: A color and outline version.

> [!Note]
> If your app has a bot or message extension, your icons are included in your Microsoft Azure Bot Service registration.

For your app to pass Teams store review, these icons must meet the following size requirements.

### Color icon

The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol (96x96 pixels) can be any color, but it must sit on a solid or fully transparent square background.

Teams automatically crops your icon to display a square with rounded corners in multiple scenarios and a hexagonal shape in bot scenarios. To crop the symbol without losing any detail, include 48 pixels of padding around your symbol.

:::image type="content" source="../../assets/images/icons/design-color-icon.png" alt-text="Teams color icon and design guidance.":::

### Outline icon

An outline icon displays in two scenarios:

* When your app is in use and “hoisted” on the app bar on the left side of Teams.
* When a user pins your app's message extension.

The icon must be 32x32 pixels. It can be white with a transparent background or transparent with a white background (no other colors are permitted). The outline icon should not have any extra padding around the symbol.

:::image type="content" source="../../assets/images/icons/design-outline-icon.png" alt-text="Teams outline icon design guidance.":::

### Best practices

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/icons/design-icon-do.png" alt-text="Illustration showing how to design your app icons.":::

#### Do: Follow the precise outline icon guidelines

The RGB values of white used in your icon must be Red: 255, Green: 255, Blue: 255. All other parts of the outline icon must be fully transparent, with the alpha channel set to 0.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/icons/design-icon-dont.png" alt-text="Illustration showing how not to design your app icons.":::

#### Don't: Crop in a circular or rounded square shape

The color icon submitted in your app package must be square. Don’t round the corners of your icon. Teams automatically adjusts the corner radius.

   :::column-end:::
:::row-end:::

#### Don't: Copy other brands

Your icons must not mimic any copyrighted products that you don't own. For example, a design similar to a Microsoft product or brand.

### Examples

Here's how app icons appear in different Teams capabilities and contexts.

#### Personal app

:::image type="content" source="../../assets/images/icons/personal-app-icon-example.png" alt-text="Example showing how an app icon looks in a personal app.":::

#### Bot (channel)

:::image type="content" source="../../assets/images/icons/bot-icon-example.png" alt-text="Example showing how an app icon looks on a bot inside channel.":::

#### Message extension

:::image type="content" source="../../assets/images/icons/messaging-extension-icon-example.png" alt-text="<alt text>":::

## Next step

Choose how you plan to distribute your app:

> [!div class="nextstepaction"]
> [Sideload your app in Teams](~/concepts/deploy-and-publish/apps-upload.md)
> [!div class="nextstepaction"]
> [Publish your app to your org](/microsoftteams/tenant-apps-catalog-teams?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/breadcrumb/toc.json)
> [!div class="nextstepaction"]
> [Publish your app to the store](~/concepts/deploy-and-publish/appsource/publish.md)

## See also

* [Distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md)
* [Manage your apps with the Developer Portal for Microsoft Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Understand the Microsoft Teams app structure](../design/app-structure.md)
* [Icons](../design/design-teams-app-fundamentals.md#icons)
