---
title: Package your app
description: Learn how to package your app for testing, uploading, and publishing in Microsoft Teams
keywords: teams apps packaging
ms.date: 01/22/2018
---

# Create an app package for your Microsoft Teams app

App experiences in Teams are defined by their app manifest, and bundled in an app package for use in uploading or AppSource submission. You'll need an app package to test your experience in Teams, via the [upload](~/concepts/apps/apps-upload.md) process.

A Teams app package is a .zip file containing the following:

* A manifest file named "manifest.json", which specifies attributes of your app and points to required resources for your experience, such the location of its tab configuration page or the Microsoft app ID for its bot.
* A transparent "outline" icon and a full "color" icon. See [Icons](#icons) later in this topic for more information.

## Creating a manifest

*Teams App Studio* is a new tool that can help configure your manifest. It also contains a React control library and configurable samples for cards. See [Getting started with Teams App Studio](~/get-started/get-started-app-studio.md).

Your manifest file must be named "manifest.json" and be at the top level of the upload package. Note that manifests and packages built previously might support an older version of the schema. For Teams apps and especially AppSource (formerly Office Store) submission, you must use the current [manifest schema](~/resources/schema/manifest-schema.md).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable IntelliSense or similar support from your code editor:
>
> `"$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.schema.json",`

## Icons

Microsoft Teams requires two icons for your app experience, to be used within the product. Icons must be included in the package and referenced via relative paths in the manifest. The maximum length of each path is 2048 bytes, and the format of the icon is .png.

### color

The `color` icon is used throughout Microsoft Teams (in app and tab galleries, bots, flyouts, and so on). This icon should be 192&times;192 pixels. Your icon can be any color (or colors), but the background should be your branded accent color. It should also have a small amount of padding surrounding the icon to accommodate the hexagonal cropping for the bot version of the icon.

### outline

The `outline` icon is used in these places: the app bar and messaging extensions the user has marked as a "favorite." This icon must be 32&times;32 pixels. Your outline icon must contain only white and transparency (no other colors). The icon can be white with transparent background or transparent with a white background. The outline icon should not have extra padding surrounding the icon and should be as tightly cropped as possible while still maintaining the 32x32 dimensions. Here are a few good examples:

![Sample outline icons](~/assets/images/icons/sample20x20s.png)

For example, say your company is Contoso. You'd submit two icons:

![Icon showcase](~/assets/images/framework/framework_submit_icon.png)

Here's how the icons would appear in the UI:

#### Bot and chiclet in Channel view

![Bot and chiclet UX](~/assets/images/icons/botandchiclet.png)

#### Flyout

![Sample Contoso icons](~/assets/images/icons/flyout.png)

#### App bar and home screen

![Sample Contoso icons](~/assets/images/icons/appbarhomescreen.png)
 
> Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot.md).
