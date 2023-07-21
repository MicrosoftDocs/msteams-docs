---
title: Public developer preview for Microsoft Teams
description: A Developer Preview (Beta) is public program to explore and test upcoming features for potential inclusion in your Microsoft Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 01/31/2023
---
# Public developer preview for Teams

>[!NOTE]
>Features included in preview may not be complete, and may undergo changes before becoming available in the public release. They are provided for testing and exploration purposes only. They should not be used in production applications.

Developer Preview is a public program for developers, which provides early access to unreleased features in Microsoft Teams. This allows you to explore and test upcoming features for potential inclusion in your Teams app. We also welcome [feedback](~/feedback.md) on any feature in developer preview. Developer preview is enabled per Microsoft Teams client, so you don't need to worry about affecting your entire organization.

## Developer preview app manifest

Many features enabled in developer preview require alterations to your app manifest JSON file. To do so, you need to use the [developer preview manifest schema](~/resources/schema/manifest-schema-dev-preview.md). If you use this schema, you can't use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md) to make these changes, nor you can use it to upload your app for testing. To upload your app you need to select the `More apps` icon on the app bar, then select the `Upload a custom app link`. Using this method you can only upload a zipped version of your app package.

You may find it useful to use Developer Portal for Teams to create the non-developer preview portions of your app package, then export that package and manually edit the `manifest.json` file to add the developer preview features you wish to use. Once you've added developer preview features to the `manifest.json` file, you can't reimport the package into Developer Portal for Teams.

## Enable developer preview

Developer preview is enabled on a per-client basis, but the option to turn on developer preview is controlled at the organization level. To enable the option to turn on developer preview for an individual, you must ensure that they have the ability to upload custom apps. See [setting up your tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) for additional information.

Using an app that contains developer preview features may cause clients that haven't enabled developer preview to behave unexpectedly. If you don't see an entry for developer preview, the most likely reason is your organization isn't configured for app uploading.

### On a desktop or web client

> [!NOTE]
> If your tenant is enrolled for [Microsoft 365 Targeted Releases](/microsoft-365/admin/manage/release-options-in-office-365), developer preview is automatically enabled and the developer preview switch isn't available.

To enable the public developer preview on a desktop or web client:

1. Enable custom app uploading or sideloading for your developer tenant. For more information, see [Enable custom Teams apps](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
1. Select the ellipsis (...) menu next to your user profile to display the Teams menu.
1. Select **About** > **Developer preview**.
1. Select **Switch to Developer preview**.

### On a mobile client

To enable the public developer preview on a mobile client:

1. Enable app uploading or sideloading for your developer tenant. For more information, see [Enable custom Teams apps](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
1. Open the hamburger menu on the top left, then select **Settings**.
1. Select **About**.
1. Turn on the **Developer preview** toggle.

## Disable developer preview

Use the same menu item under About → Developer preview, and select it to turn it off.

## See also

[Test and debug your Microsoft Teams app](~/concepts/build-and-test/debug.md)
