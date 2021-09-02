---
title: Enable your app to be customized
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---

# App customization

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

## App hidden by default

To enhance Teams app experience, you can hide an app from users by default until allowed by admin. You can configure app before publishing to the global app store.

For example, Contoso Electronics has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first set up specific properties of the app. The app is hidden by default and is available to users only after the admin allows it. When `defaultHideUntilAdminAction:true` is set, a notification is sent to an admin. The app requests action by the admin before user can access the app. The app status shows as `Pending Configuration`. From **Manage apps**, the admins can allow the app with `Pending Configuration` status.

### App customization options

You can select the following options to hide any app:

* You opt to hide or block the app by default until it's configured or customized by an admin.
* You submit a new version of the app to the store with the default hide or block property specified.

You can choose not to hide the app:
1. Remove the hide app option.
1. Update the manifest.

When the new version of the app is approved, the app is allowed by default as long as the admin provides consent. If you've never taken any action, the app, which was in `PendingConfig` state, is now allowed.

An app is blocked by publisher and is also blocked by the tenant admin. If the publisher allows the app, it's still blocked, because admin has blocked it.

### User experience in Teams runtime

On desktop, web, mobile, and Teams Store, you can set an app to be blocked by default. The app is hidden everywhere where that experience is served by Teams, until admins allow it. The experience includes the following but isn't limited to:
* Personal app bar
* Tab galleries
* In chat as a bot
* The meetings experience

App upgrades result in no change of behavior except removal of default block support. When you submit an update of any app, the normal upgrade process is followed. If you specify `defaultHideUntilAdminAction:true`, the app is hidden by default until admin takes action once again.

### User experience outside of Teams runtime

You can measure how many tenants allow your apps and how many users are using them.

> [!NOTE]
> The admin actions to allow any app must be compliant with Government Community Cloud (GCC) requirements.

The following table lists the different user types and their app access support:

| User type | App access support |
| --------- | --------- |
| Guest | If it's set to allow in the tenant that they're currently active in, guests can view the app. |
| Anonymous | If it's allowed by the tenant they're currently joined in, anonymous users can view the app. |
| Federated | Federated users aren't supported. |
| Users in shared channels | Users in shared channels are currently not supported and are out of scope. |

## See also

* [Customize apps in the Teams admin center](/MicrosoftTeams/customize-apps)
