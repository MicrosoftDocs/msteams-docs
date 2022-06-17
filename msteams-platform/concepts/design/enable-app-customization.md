---
title: Customize your Teams app
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
ms.localizationpriority: medium
ms.author: surbhigupta
ms.topic: overview
keywords: accent color brand hide app approval
---

# Customize your Teams app

## Enable your Microsoft Teams app to be customized

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and apps published for an org can't be customized.

Some possible examples of this feature include:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see.
(Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)

You can enable this feature in the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). This configures `configurableProperties`, which isn't available in versions before 1.10 of the Teams app manifest.

### Test your app

You can't test this feature during development. App customization isn't supported when sideloading or publishing to an org's app catalog.

### User considerations

Provide guidelines for customers (specifically Teams admins) who want to customize your app. For more information, see [customize apps in Teams](/MicrosoftTeams/customize-apps).

## Hide Teams app until admin approves

To enhance Teams app experience, you can hide an app from users by default until admin allows to unhide the app. For example, Contoso Electronics has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first set up specific properties of the app. The app is hidden by default and is available to users only after the admin allows it.

> [!NOTE]
> Teams store has evolved:
>
> Previously, the LOB apps were updated by selecting the ellipses on the tile. With the updated Teams store experience, you can now update the LOB apps by logging in to the [Teams Admin Centre](https://admin.teams.microsoft.com).

To hide the app, in the app manifest file, set the `defaultBlockUntilAdminAction` property to `true`. When the property is set to `true`, in Teams admin center > **Manage apps**, **Blocked by publisher** appears in app's **Status**:

:::image type="content" source="../../assets/images/apps-in-meetings/manageappsblockedapps.png" alt-text="Manage apps blocked by publisher":::

The admin gets a request to take action before a user can access the app. Under **Manage apps**, the admins can select **Allow** to allow the app with **Blocked by publisher** status:

![Manage apps](../../assets/images/apps-in-meetings/manageapp.png)

If by default, you don't want the app to be hidden, you can update the `defaultBlockUntilAdminAction` property to `false`. When the new version of the app is approved, by default the app will be allowed as long as the admin hasn't taken any explicit action.

> [!NOTE]
> `defaultBlockUntilAdminAction` is not supported for LOB apps. If you upload an LOB app with this property then the app will not be blocked.

## See also

* [App manifest schema](/microsoftteams/platform/resources/schema/manifest-schema)
* [Customize apps in the Teams admin center](/MicrosoftTeams/customize-apps)
