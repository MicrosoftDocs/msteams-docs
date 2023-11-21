---
title: Package your app
description: Learn how to package your Microsoft Teams app and upload it to Teams. Create app package, enable custom uploading, ensure your app is running and accessible using HTTPs.
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 09/28/2022
---

# Create Teams app package

To distribute your Microsoft Teams app, you need have an app package. A valid app package is a ZIP file that must contain the following files:

* **App manifest**: Describes how your app is configured, including its capabilities, required resources, and other important attributes.
* **App icons**: Each package requires a color and outline icon for your app.

To create an app package, perform the following steps:

1. Zip the app manifest, color icon, and outline icon files
1. Provide a suitable name

Sample app manifest

While creating app from Teams Toolkit, the app manifest generates from a template file and resolves the environment variable using the env files. You can then customize the manifest file based on your requirements.

To customize app manifest using Teams Toolkit, see [Visual Studio code](../../toolkit/TeamsFx-preview-and-customize-app-manifest.md) and [Visual Studio](../../toolkit/toolkit-v4/TeamsFx-preview-and-customize-app-manifest-vs.md).

You can add capabilities bot, tab, and message extensions to your app by updating the app manifest with the required app capability. For more information, see [build app with app capabilities](../../get-started/get-started-overview.md).

To get the app manifest for your app package in Teams, you need to create a ZIP file that contains the manifest.json file and the app icons. The manifest.json file describes how your app is configured, including its capabilities, required resources, and other important attributes. The app icons are the color and outline versions of your app logo that display in different Teams scenarios.

If you are using the Teams Toolkit, you can customize and preview the app manifest file in Visual Studio or Visual Studio Code. The Teams Toolkit generates the app manifest file from a template file and resolves the environment variables using the env files. You can also use the Teams Toolkit to zip the app package and validate the app manifest file.

## Teams doesn't host your app

When a user installs your app in Teams, they install an app package that contains only a configuration file (also known as an app manifest) and your app's icons. The app's logic and data storage are hosted elsewhere, such as on localhost during development and Azure Web Services. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app":::

## App manifest

Your app manifest file must be at the top level of the package with the name `manifest.json`.

When publishing to the Microsoft Teams Store, make sure your manifest references to the latest [schema](~/resources/schema/manifest-schema.md).

## App icons

Your app package must include two .png versions of your app icon: A color and outline version.

> [!NOTE]
> If your app has a bot or message extension, your icons are included in your Microsoft Azure Bot Service registration.

For your app to pass Teams Store review, these icons must meet the following size requirements.

### Color icon

The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol (96x96 pixels) can be any color, but it must sit on a solid or fully transparent square background.

Teams automatically crops your icon to display a square with rounded corners in multiple scenarios and a hexagonal shape in bot scenarios. To crop the symbol without losing any detail, include 48 pixels of padding around your symbol.

:::image type="content" source="../../assets/images/icons/design-color-icon.png" alt-text="Teams color icon and design guidance.":::

### Outline icon

An outline icon displays in two scenarios:

* When your app is in use and “hoisted” on the app bar on the left side of Teams.
* When a user pins your app's message extension.

Ensure the icon is 32x32 pixels. It should be either white with a transparent background or transparent with a white background. No other colors are allowed. The outline icon mustn't contain any additional padding around the symbol.

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
> [Publish your app to the Teams Store](~/concepts/deploy-and-publish/appsource/publish.md)

## See also

* [Distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md)
* [Manage your apps with the Developer Portal for Microsoft Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Understand the Microsoft Teams app structure](../design/app-structure.md)
* [Icons](../design/design-teams-app-fundamentals.md#icons)
