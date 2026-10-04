---
title: TODO Public Developer Preview
description: TODO A Developer Preview (Beta) is public program to explore and test upcoming features for potential inclusion in your Microsoft Teams app.
ms.topic: article
ms.date: 01/31/2023
---
# Teams preview features for developers

New Teams platform features are often made available to developers before they become generally available to users. Developers are encouraged to integrate these preview features into test versions of their agents and apps, [provide feedback](~/feedback.md) about them, and prepare to take advantage of them as soon as they are released.

Preview-related implementation and user experience considerations vary by feature, and are documented with each preview feature. This article explains two of the most common requirements:

- Teams public preview participation for feature evaluation and testing
- Use of the developer preview app manifest

Preview features are subject to change prior to release. Developers should test integration of preview features with controlled audiences. Integration of preview features in agents or apps released to production is not recommended.

## Teams public preview

Teams public preview is an opt-in feature of the Teams client that allows users to experience a designated set of unreleased Teams features. Tenant administrators can set per-user policies requiring or disallowing participation, or enabling users to individually choose whether to opt in.

Most preview platform features available to agent and app developers require public preview participation to access in the Teams client. To facilitate feature evaluation and testing, developers should opt in to public preview, and should work with administrators and users to enroll controlled testing audiences. See [Microsoft Teams Public preview](/MicrosoftTeams/public-preview-doc-updates) in the Teams administrator documentation for complete information about enabling public preview.

Public preview participation affects the Teams client experience, not the developer experience. It has no effect on implementation-level access to unreleased platform features. It can't be used as a general feature flag mechanism; users' participation in public preview is not made known to agents and apps.

Public preview is available to any Teams user with administrator consent, but developers should not expect or require production users to participate in public preview.

## Developer preview app manifest

Preview features that depend on app manifest configuration often require use of the [developer preview version of the app manifest schema](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true). To use it, specify the following `$schema` and `manifestVersion` values in your app manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview"
}
```

Agents and apps that use the developer preview version of the manifest schema cannot be published to the Teams store.

If you use this schema, you can't use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md) to make these changes or upload your app for testing. To upload your app in Teams, select **Apps** > **Manage your apps** > **Upload an app**. Using this method, you can only upload a zipped version of your app package.

You might find it useful to use Developer Portal to create the non-developer preview portions of your app package, then export that package and manually edit the `manifest.json` file to add the developer preview features you wish to use. After you added the developer preview features to the `manifest.json` file, you can't reimport the package into Developer Portal.

---

---

Access requirements for both users and developers vary by feature. Most early-access features

Most preview fea

Some features that are not yet generally available may have additional eligibility

Developer Preview is a public program for developers, which provides early access to unreleased features in Microsoft Teams. Developer Preview allows you to explore and test upcoming features for potential inclusion in your Teams app. We also welcome [feedback](~/feedback.md) on any feature in developer preview. Developer preview is enabled per Microsoft Teams client, so you don't need to worry about affecting your entire organization.

Features not yet generally available might not be complete and might undergo changes prior to release. They're provided for testing and exploration purposes, and should not be used in production applications.

> [!div class="nextstepaction"]
> [Go to developer preview app manifest schema](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true)

## Teams public preview

Teams public preview is an experience to which users opt in, at the discretion of their Teams administrators.

-
- Features that are part of the Teams public preview program are available to users that opt in. Teams administrators manage their users' access to the public preview program, and can enable

Participation in Teams public preview is an individual user

participate
enroll

is an optional experience that users can enable, at the discretion of their Teams administrators.

Features that are part of Teams public preview are available to users who opt in to the program. Public preview access is

## Developer preview app manifest

Some preview features require use of the [developer preview version of the app manifest schema](/microsoft-365/extensibility/schema/?view=m365-app-prev&preserve-view=true). To use it, specify the following `$schema` and `manifestVersion` values in your app manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview"
}
```

Agents and apps that use the developer preview version of the manifest schema cannot be published to the Teams store.

If you use this schema, you can't use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md) to make these changes or upload your app for testing. To upload your app in Teams, select **Apps** > **Manage your apps** > **Upload an app**. Using this method, you can only upload a zipped version of your app package.

You might find it useful to use Developer Portal to create the non-developer preview portions of your app package, then export that package and manually edit the `manifest.json` file to add the developer preview features you wish to use. After you added the developer preview features to the `manifest.json` file, you can't reimport the package into Developer Portal.

## Teams public preview

Developer preview is enabled on a per-client basis, but the option to turn on developer preview is controlled at the organization level. To enable the option to turn on developer preview for an individual, you must ensure that they have the ability to upload custom apps. For more information, see [setting up your tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

Using an app that contains developer preview features might cause clients that didn't enable developer preview to behave unexpectedly. If you don't see an entry for developer preview, the most likely reason is your organization isn't configured for app uploading.

### Desktop client

> [!NOTE]
> If your tenant is enrolled for [Microsoft 365 Targeted Releases](/microsoft-365/admin/manage/release-options-in-office-365), developer preview is automatically enabled and the developer preview switch isn't available.

# [New Teams client](#tab/new-teams-client)

To enable the public developer preview on Teams desktop client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-configure-custom-app-upload-settings).
1. Select **Settings and more** (**...**) next to your user profile.
1. Select **Settings** > **About Teams**.
1. Under **Early access**, select the **Public preview** checkbox.

:::image type="content" source="../../assets/images/teams-enable-developer-preview.png" alt-text="Screenshot shows the Public preview checkbox option in About Teams section in Teams settings.":::

# [Classic Teams](#tab/classic-teams)

To enable the public developer preview on Teams desktop or web client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-configure-custom-app-upload-settings).
1. Select the **Settings and more** (**...**) next to your user profile.
1. Select **About** > **Developer preview**.

   :::image type="content" source="../../assets/images/classic-teams-developer-preview.png" alt-text="Screenshot shows the Developer preview option in the About section in Classic Teams.":::

1. Select **Switch to developer preview**.

---

### Mobile client

To enable the public developer preview on Teams mobile client:

1. Enable custom app upload for your developer tenant. For more information, see [enable custom app upload](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-configure-custom-app-upload-settings).
1. In the upper-left corner, select your user profile.
1. Select **Settings**.
1. Select **About**.
1. Turn on the **Developer preview** toggle.

> [!NOTE]
> If you [enable custom Teams apps and turn on custom app uploading](../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-configure-custom-app-upload-settings) doesn't enable developer preview features in Microsoft Teams [set the update policy](/MicrosoftTeams/public-preview-doc-updates#set-the-update-policy).

## Disable developer preview

Use the same menu item under About → Developer preview and select it to turn it off.

## See also

[Test and debug your Microsoft Teams app](~/concepts/build-and-test/debug.md)
