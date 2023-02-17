---
title: Enable app customization and block apps until admin allows
author: heath-hamilton
description: In this module, understand how Teams admins can customize your Teams app for their org and hide Teams app until admin approves.
ms.localizationpriority: medium
ms.author: surbhigupta
ms.topic: overview
---

# Enable app customization and block apps until admin allows

Microsoft Teams lets admins customize apps to enhance store experience and adhere to their organization's branding. An app developer can allow their app to be customized by a Teams admin. For more information about admin tasks, see
[Customize apps in the Teams admin center](/MicrosoftTeams/customize-apps).

## Enable customization for your Microsoft Teams app

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and custom apps (apps published within an org) can't be customized.

Some possible uses of this feature are:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see.
(Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)
* Changing the description to include language and guidance that is better understood by your organization's end-users.
* Changing logo and logo outline to inspire confidence to the end-users to use the app since it seems provided by their organization.

You can enable the feature by defining the app properties that your customers can customize in the [`configurableProperties` section in the Teams app manifest](/microsoftteams/platform/resources/schema/manifest-schema#configurableproperties), starting with version 1.11. You can use [Developer Portal for Teams](https://dev.teams.microsoft.com/home) to edit the manifest of your app.

> [!IMPORTANT]
> You can't test this feature during development. App customization isn't supported when sideloading or publishing to an org's app catalog.

### User considerations

Provide guidelines for customers (specifically Teams admins) who want to customize your app. For more information, see [customize apps in Teams](/microsoftteams/customize-apps).

## Block apps by default for users until an admin approves

To enhance Teams app experience, you can hide an app from users by default until admin allows to unhide the app. For example, Contoso Electronics has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first configure specific properties of the app. The app is hidden by default and is available to users only after the admin allows it.

To block the app by default, in the app manifest file, set the `defaultBlockUntilAdminAction` property to `true`. When the property is set to `true`, the status of the app in Teams admin center is **Blocked by publisher** in the [Manage apps](https://admin.teams.microsoft.com/policies/manage-apps) page.

:::image type="content" source="../../assets/images/manage-apps-status.png" alt-text="The screenshot is an example that shows an app blocked by publisher." lightbox="../../assets/images/manage-apps-status-expanded.png":::

The admin gets a request to take action before a user can access the app. Under **Manage apps**, the admins can select **Allow** to allow the app with **Blocked by publisher** status:

:::image type="content" source="../../assets/images/manage-apps-allow.png" alt-text="The screenshot is an example that shows the allow option for the app blocked by publisher." lightbox="../../assets/images/manage-apps-allow-expanded.png":::

If by default, you don't want the app to be hidden, you can update the `defaultBlockUntilAdminAction` property to `false`. When the new version of the app is approved, by default the app will be allowed as long as the admin hasn't taken any explicit action.

> [!NOTE]
> For LOB apps, `defaultBlockUntilAdminAction` is not supported. The app is not blocked if you upload a LOB app with this property.

## See also

* [App manifest schema](/microsoftteams/platform/resources/schema/manifest-schema)
* [Customize apps in the Teams admin center](/microsoftteams/customize-apps)
