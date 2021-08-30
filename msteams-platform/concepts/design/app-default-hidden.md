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

## App customization options

You can select the following options to hide any app:

* You opt to hide or block the app by default until it's configured or customized by an admin.
* You submit a new version of the app to the store with the default hide or block property specified.

You can choose not to hide the app by removing it and updating the manifest. When the new version of the app is approved, the app is allowed by default as long as the admin provides consent. 

If you've never taken any action, the app, which was in `PendingConfig` state is now allowed.

## App customization by Admins

To enhance user experience, admins configure apps before making them available to users:

![App configure before enabling](../../assets/images/apps-in-meetings/appconfiguremessage.png)

To specify whether the app is hidden by default in a new section in the app manifest, add the `defaultHideUntilAdminAction:true` manifest field.

Apps are hidden by default until admin action continue to treat the app type as first-party or third-party. The customized apps appear in third-party category of the store and not as custom apps in the management experience. After an admin allows an app, you can toggle to allow or block the app.

## Scenario

Contoso Electronics is an independent software vendor (ISV) who has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first set up specific properties of the app. The ISV specifies to hide the app by default. The app is available to users only after the Admin allows it.

When an ISV sets `defaultHideUntilAdminAction:true`, a notification is sent to an admin. The app requests action by the admin before user access. The app status shows as `Pending Configuration`.

The app with `Pending Configuration` status shows as pending configuration in **Manage apps** page and Admins can allow the app from that page.

Saving the app configuration doesn't affect the app status and the Admin must allow the app.

### User experience in Teams runtime

In Teams Store, if an app is submitted with the default status as blocked, the app is hidden from users by default. The app is hidden until an Admin takes an action to allow it.

On desktop or web and on mobile, when you set an app to be blocked by default, the app is hidden everywhere where that experience is served by Teams, until Admin allows it. This experience includes but is not limited to the personal app bar, the tab galleries, in chat as a bot, and through the meetings experience.

App upgrades result in no change of behavior except as related to removal of default block support. When you submit an update of a given app, the normal upgrade process is followed. If you specify `defaultHideUntilAdminAction:true`, the app is hidden by default until Admin takes action once again.

### User experience outside of Teams runtime

You can measure how many tenants allow your apps and how many users are using them.

Customers in Government Community Cloud (GCC), GCC-High, and Department Of Defense (DOD) are affected when you choose to have your app blocked by default until an Admin takes action. Admin action to allow must be handled in compliance with the GCC requirements.

The scenarios where app is allowed or not allowed are as follows:

| User type | If user can view the app or not |
| --------- | --------- |
| Guest | Guests view the app if it's set to allow in the tenant that they're currently active in. |
| Anonymous | Anonymous users can view the app if it's set to allow by the tenant that they're currently joined in. |
| Federated | Federated users aren't supported. |
| Users in shared channels | Users in shared channels are currently not supported and are out of scope. |

**To change the configuration settings for the app**

1. In Teams admin center, select **Settings** in the app's **Manage apps** page.
1. In **Landing Site URL**, enter the URL and select **Save**. The **Desktop settings are updated** message appears.

    ![Change settings for app](../../assets/images/apps-in-meetings/appsettingschange.png)

1. For **Status** for the app, select **Allowed**.

## See also

[Enable your Microsoft Teams app to be customized](enable-app-customization.md)