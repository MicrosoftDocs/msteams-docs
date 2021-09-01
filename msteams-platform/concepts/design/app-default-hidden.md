---
title: App hidden by default
description: Understand how Teams admins can customize your app.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: conceptual
---

# App hidden by default

To enhance Teams app experience, you can hide an app until configured. Admins configure the app before publishing to the global app store. Admins hide an app until it's set up. This feature allows you to specify whether your app can be hidden from users by default until configured.

> [!NOTE]
> By default, all first-party and third-party apps are allowed.

## Scenario

Contoso Electronics is an independent software vendor (ISV) who has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first set up specific properties of the app. The ISV specifies to hide the app by default. The app is available to users only after the admin allows it. When an ISV sets `defaultHideUntilAdminAction:true`, a notification is sent to an admin. The app requests action by the admin before user can access the app. The app status shows as `Pending Configuration`. From **Manage apps**, the admins can allow the app with `Pending Configuration` status.

## App customization options

You can select the following options to hide any app:

* You opt to hide or block the app by default until it's configured or customized by an admin.
* You submit a new version of the app to the store with the default hide or block property specified.

You can choose not to hide the app:
1. Remove the hide app option.
1. Update the manifest.

When the new version of the app is approved, the app is allowed by default as long as the admin provides consent. If you've never taken any action, the app, which was in `PendingConfig` state, is now allowed. 

An app that is blocked by publisher is also blocked by the tenant admin. Now if the publisher decides to allow the app, the app will still be blocked, because the admin explicitly took an action to block it.

## App customization by Admins

To enhance user experience, admins configure apps before making them available to users:

![App configure before enabling](../../assets/images/apps-in-meetings/appconfiguremessage.png)

To specify whether the app is hidden by default in a new section in the app manifest, add the `defaultHideUntilAdminAction:true` manifest field.

Apps are hidden by default until admin action continue to treat the app type as first-party or third-party. The customized apps appear in third-party category of the store. After an admin allows an app, you can toggle to allow or block the app.

**To change the configuration settings for the app**

1. Go to Teams admin center.
1. In **Manage apps**, select **Settings**.
1. In **Landing Site URL**, enter the URL and select **Save**. The **Desktop settings are updated** message appears.

    ![Change settings for app](../../assets/images/apps-in-meetings/appsettingschange.png)

1. For **Status** for the app, select **Allowed**.

## User experience in Teams runtime

On desktop, web, mobile, and Teams Store, you can set an app to be blocked by default. The app is hidden everywhere where that experience is served by Teams, until admins allow it. The experience includes the following but isn't limited to:
* Personal app bar
* Tab galleries
* In chat as a bot
* The meetings experience

App upgrades result in no change of behavior except removal of default block support. When you submit an update of any app, the normal upgrade process is followed. If you specify `defaultHideUntilAdminAction:true`, the app is hidden by default until admin takes action once again.

## User experience outside of Teams runtime

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

[Enable your Microsoft Teams app to be customized](enable-app-customization.md)