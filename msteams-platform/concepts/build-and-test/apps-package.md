---
title: Package your app
description: Learn how to create, package, and upload Microsoft Teams app, icons for different Teams capabilities, and ensure your app is running and accessible through HTTPS.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 12/19/2024
---

# Teams app package

An app package is a file format that has the required resources to install and run your app in Teams and it must contain the following files:

* **[App manifest](#app-manifest)**: Describes how your app is configured, including its capabilities, required resources, and other important attributes.
* **[App icons](#app-icons)**: Each package requires a color and outline icon for your app.
* **[Custom icons](../design/activity-feed-notifications.md#custom-icons-in-activity-feed-notifications)**: Tailor-made icons that you can use in activity feed notifications. For more information, see [custom icons in activity feed notifications](../../tabs/send-activity-feed-notification.md#custom-icons-in-activity-feed-notifications).

To publish your Microsoft Teams app, you need to zip the files in the app package folder and provide a suitable name.

## Teams doesn't host your app

When a user installs your app in Teams, they install an app package that contains only a configuration file (also known as an app manifest) and your app's icons. The app's logic and data storage are hosted elsewhere, such as on localhost during development and Microsoft Azure for production. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app":::

> [!NOTE]
> The [Microsoft Teams JavaScript client library (TeamsJS)](../../tabs/how-to/using-teams-client-library.md) can help you create hosted experiences in Teams, Microsoft 365 app, and Outlook. When creating your server-side app package, you must be aware that with version 2.31.0, the TeamsJS library is fully tree-shakeable. [Tree shaking](https://developer.mozilla.org/docs/Glossary/Tree_shaking) is a JavaScript optimization that eliminates unused code. For more information, see [improve load time performance with JavaScript tree shaking](../../tabs/how-to/using-teams-client-library.md#improve-load-time-performance-with-javascript-tree-shaking).

## App manifest

An app manifest describes your app's configuration, including its capabilities, required resources, and other significant attributes with the name `manifest.json` in the app package.

You can create an app and configure the app manifest through one of the following platforms:

* **Teams Toolkit**: A set of tools and extensions in Microsoft Visual Studio Code and Visual Studio to create, debug, and deploy an app. When creating an app, the app manifest generates from a template file based on the selected capabilities. You can then customize in [Visual Studio Code](../../toolkit/TeamsFx-preview-and-customize-app-manifest.md) or [Visual Studio](../../toolkit/toolkit-v4/TeamsFx-preview-and-customize-app-manifest-vs.md) based on your requirements, validate the manifest file, and zip the app package.

* **Developer Portal for Teams**: A web-based platform that helps you create your app, configure your app manifest, and generate an app package. To create an app through Developer Portal for Teams, see [create and register an app](teams-developer-portal.md).

You can add bot, tab, message extensions, and other capabilities to your app by updating the app manifest with the required app capability. For more information, see [build app with app capabilities](../../get-started/get-started-overview.md#build-your-first-teams-app).

When you publish your app to the Microsoft Teams Store, ensure your app manifest references to the latest [app manifest schema](~/resources/schema/manifest-schema.md). For sample app manifest, see [Hello world sample app](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/demo-manifest/app-hello-world.zip).

## App icons

Your app package must include two .png versions of your app icon: A color and outline version.

> [!NOTE]
> If your app has a bot or message extension, your icons are included in your Microsoft Azure Bot Service registration.

For your app to pass Teams Store review, these icons must meet the following size requirements.

### Color icon

* **Teams**: The color version of your icon displays in most Teams scenarios and must be 192x192 pixels. Your icon symbol (96x96 pixels) can be any color, but it must sit on a solid or fully transparent square background.

  Teams automatically crops your icon to display a square with rounded corners in multiple scenarios and a hexagonal shape in bot scenarios. To crop the symbol without losing any detail, include 48 pixels of padding around your symbol.

  :::image type="content" source="../../assets/images/icons/design-color-icon.png" alt-text="Teams color icon and design guidance.":::

* **Outlook and Microsoft 365 (Preview)**: You can specify a [32x32 color icon](~/resources/schema/manifest-schema-dev-preview.md#icons) with a transparent background to ensure a consistent appearance when your app runs in Outlook and Microsoft 365. If not specified, a scaled down [color icon](#color-icon) with rounded corners (and in some cases, opaque background) is used, which may not share the same look and feel of the host environment.

  > [!NOTE]
  > 32x32 color icon is available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

  :::image type="content" source="../../assets/images/icons/design-outline-icon.png" alt-text="Screenshot shows the design guidance of an outline and 32x32 color icon.":::

|Microsoft 365 host application |Scenario  | Required|
|---------|---------|----|
|Teams     | Displays in most Teams scenarios and must be 192x192 pixels.      |✔️ |
|Outlook and Microsoft 365 (Preview)   |  When an app is pinned in Outlook or Microsoft 365.        ||

### Outline icon

An outline icon displays in two scenarios:

* When your app is in use.
* When your app is pinned to the app bar on the left side of Teams.

  Follow these specifications for the outline icon design:

  * Ensure that the outline icon size is 32x32 pixels.
  * The icon must be either white with a transparent background or transparent with a white background. No other colors are allowed.
  * The outline icon mustn't contain any additional padding around the symbol.

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

Choose how you plan to publish your app:

> [!div class="nextstepaction"]
> [Upload your custom app in Teams](~/concepts/deploy-and-publish/apps-upload.md)
> [!div class="nextstepaction"]
> [Publish your app to your org](/microsoftteams/tenant-apps-catalog-teams?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/breadcrumb/toc.json)
> [!div class="nextstepaction"]
> [Publish your app to the Teams Store](~/concepts/deploy-and-publish/appsource/publish.md)

## See also

* [Understand the Microsoft Teams app structure](../design/app-structure.md)
* [Icons](../design/design-teams-app-fundamentals.md#icons)
