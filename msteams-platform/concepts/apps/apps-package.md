---
title: Package your app
description: Learn how to package your app for testing, uploading, and publishing in Microsoft Teams
keywords: teams apps packaging
ms.date: 01/02/2018
---

# Create the package for your Microsoft Teams app

App experiences in Teams are defined by their app manifest, and bundled in an app package for use in uploading or Office Store submission. You'll need an app package to test your experience in Teams, via the [upload](~/concepts/apps/apps-upload) process.

A Teams app package is a .zip file containing the following:

* A manifest file named "manifest.json", which specifies attributes of your app and points to required resources for your experience, such the location of its tab configuration page or the Microsoft app ID for its bot.
* A transparent "outline" icon and a full "color" icon.  See [Icons](#icons) later in this topic for more information.

## Creating a manifest

Your manifest file must be named "manifest.json" and be at the top level of the upload package. Note that manifests and packages built previously might support an older version of the schema. For Teams apps and especially Office Store submission, you must use the current [manifest schema](~/resources/schema/manifest-schema).

> [!TIP]
> Specify the schema at the beginning of your manifest to enable IntelliSense or similar support from your code editor:
>
> `"$schema": "https://statics.teams.microsoft.com/sdk/v1.0/manifest/MicrosoftTeams.schema.json",`

## Icons

Microsoft Teams requires two icons for your app experience, to be used within the product. Icons must be included in the package and referenced via relative paths in the manifest. The maximum length of each path is 2048 bytes, and the format of the icon is .png.

### color

The `color` icon is used throughout Microsoft Teams (in app and tab galleries, bots, flyouts, and so on). This icon should be 96&times;96 pixels. If it has transparency, the `accentColor` will be used as the background.

### outline

The `outline` icon is used in three specific places: the app bar, pinnned messaging extensions, and chiclets. This icon must be 20&times;20; it needs to be a trace image using white, and use a transparent background. Here are a few good examples:

![Sample outline icons](~/assets/images/icons/sample20x20s.png)

For example, say your company is Contoso. You'd submit two icons:

![Sample Contoso icons](~/assets/images/icons/contosoicons.png)

Here's how the icons would appear in the UI:

#### Bot and chiclet in Channel view

![Bot and chiclet UX](~/assets/images/icons/botandchiclet.png)

#### Flyout

![Sample Contoso icons](~/assets/images/icons/flyout.png)

#### App bar and home screen

![Sample Contoso icons](~/assets/images/icons/appbarhomescreen.png)
 
> Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot).
