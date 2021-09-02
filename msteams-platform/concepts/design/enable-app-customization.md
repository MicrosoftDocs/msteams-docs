---
title: Enable your app to be customized
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---

# Customize and configure your Teams app

## Enable your Microsoft Teams app to be customized

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and apps published for an org can't be customized.

Some possible examples of this feature include:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see. (Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)

You can enable this feature in the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). This feature configures `configurableProperties`, which isn't available in versions before 1.10 of the Teams app manifest.

### Test your app

You can't test this feature during development. App customization isn't supported when sideloading or publishing to an org's app catalog.

### User considerations

Provide guidelines for customers (specifically Teams admins) who want to customize your app. For more information, see [customize apps in Teams](/MicrosoftTeams/customize-apps).

## Enable your Teams app to be hidden

To enhance Teams app experience, you can hide an app from the users by default until the admin allows to unhide the app. For example, Contoso Electronics has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first set up specific properties of the app. The app is hidden by default and is available to users only after the admin allows it.

To hide the app, in the app manifest file, set the `defaultHideUntilAdminAction` parameter to `true`. When the parameter is set to true, a notification is sent to the admin. The admin gets a request to take action before a user can access the app. The app status shows as `Pending Configuration`. In Teams admin center, under **Manage apps**, the admins can allow the app with `Pending Configuration` status.

![Manage apps](../../assets/images/apps-in-meetings/manageapp.png)

If by default, you don't want the app to be hidden, you can update the `defaultHideUntilAdminAction` parameter to `false`. When the new version of the app is approved, by default the app will be allowed as long as the admin has not taken explicit action to block it.

### User experience

A guest and an anonymous user can view the app, if the admin sets it to allow in the tenant that they're currently active in. Federated and users in shared channels are not supported.

## See also

* [Customize apps in the Teams admin center](/MicrosoftTeams/customize-apps)
