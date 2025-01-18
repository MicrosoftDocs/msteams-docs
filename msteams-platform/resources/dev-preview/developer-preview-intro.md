---
title: Public Developer Preview
description: Understand about Developer Preview (Beta), a public program to explore, enable, disable & test upcoming features for potential inclusion in your Microsoft Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 01/31/2023
---
# Public developer preview for Teams

>[!NOTE]
>Features included in preview may not be complete and may undergo changes before becoming available in the public release. They are provided for testing and exploration purposes only. They should not be used in production applications.

Developer Preview is a public program for developers, which provides early access to unreleased features in Microsoft Teams. Developer Preview allows you to explore and test upcoming features for potential inclusion in your Teams app. We also welcome [feedback](~/feedback.md) on any feature in developer preview. Developer preview is enabled per Microsoft Teams client, so you don't need to worry about affecting your entire organization.

## Developer preview app manifest

Many features enabled in developer preview require alterations to your app manifest (previously called Teams app manifest) JSON file. To do so, you need to use the [developer preview app manifest schema](~/resources/schema/manifest-schema-dev-preview.md). If you use this schema, you can't use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md) to make these changes or upload your app for testing. To upload your app in Teams, select **Apps** > **Manage your apps** > **Upload an app**. Using this method, you can only upload a zipped version of your app package.

You might find it useful to use Developer Portal to create the non-developer preview portions of your app package, then export that package and manually edit the `manifest.json` file to add the developer preview features you wish to use. After you added the developer preview features to the `manifest.json` file, you can't reimport the package into Developer Portal.

## Enable developer preview

Developer preview is enabled on a per-client basis, but the option to turn on developer preview is controlled at the organization level. To enable the option to turn on developer preview for an individual, you must ensure that they have the ability to upload custom apps. For more information, see [setting up your tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

Using an app that contains developer preview features might cause clients that didn't enable developer preview to behave unexpectedly. If you don't see an entry for developer preview, the most likely reason is your organization isn't configured for app uploading.

### Desktop or web client

> [!NOTE]
> If your tenant is enrolled for [Microsoft 365 Targeted Releases](/microsoft-365/admin/manage/release-options-in-office-365), developer preview is automatically enabled and the developer preview switch isn't available.

# [New Teams client](#tab/new-teams-client)

To enable the public developer preview on Teams desktop or web client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
1. Select **Settings and more** (**...**) next to your user profile.
1. Select **Settings** > **About Teams**.
1. Under **Early access**, select the **Public preview** checkbox.

:::image type="content" source="../../assets/images/teams-enable-developer-preview.png" alt-text="Screenshot shows the Public preview checkbox option in About Teams section in Teams settings.":::

# [Classic Teams](#tab/classic-teams)

To enable the public developer preview on Teams desktop or web client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
1. Select the **Settings and more** (**...**) next to your user profile.
1. Select **About** > **Developer preview**.

   :::image type="content" source="../../assets/images/classic-teams-developer-preview.png" alt-text="Screenshot shows the Developer preview option in the About section in Classic Teams.":::

1. Select **Switch to developer preview**.

---

### Mobile client

To enable the public developer preview on Teams mobile client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
1. In the upper-left corner, select your user profile.
1. Select **Settings**.
1. Select **About**.
1. Turn on the **Developer preview** toggle.

> [!NOTE]
> If you [enable custom Teams apps and turn on custom app uploading](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) doesn't enable developer preview features in Microsoft Teams [set the update policy](/MicrosoftTeams/public-preview-doc-updates#set-the-update-policy).

## Disable developer preview

Use the same menu item under About → Developer preview and select it to turn it off.

## See also

[Test and debug your Microsoft Teams app](~/concepts/build-and-test/debug.md)
