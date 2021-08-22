---
title: App hidden by default
description: Understand how Teams admins can customize your app.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: conceptual
---

# Hide app until Admin allows it

You can customize Microsoft Teams app experience by hiding the app from users by default until Admin allows it. When an app is published to the global app store, Admins can configure the app before making it available to users. Admins can allow or not allow the app to ensure the app experience is not affected until the app is fully set up. A fully configured app enables better adoption and reduces roadblocks in users’ cognitive understanding.

This feature allows you to specify whether your app can be hidden from users by default until configured.

## Scenario

Contoso Electronics is an ISV that has created a help desk app for Microsoft Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants its customers to first set up specific properties of the app. The ISV can specify if they want their app to be blocked by default. The app is available to users only after the Admin allows it.

## Solution

Allowing IT Admins to configure apps before making them available to users helps drive a better user experience, and thus drive greater usage of third-party apps.

![App configure before enabling](../assets/images/apps-in-meetings/appconfiguremessage.png)

To optionally specify whether the app is blocked by default in the app manifest, add the following manifest field:

`defaultHideUntilAdminAction:true`

Support for app configuration is not required. By default, all first-party and third-party apps are allowed. Only when a developer opts into default hiding or blocking the app until it is configured or customized by an Admin  – and submits a new version of their app to the store with the default block property specified– will the app be default blocked.

If an app developer chooses to no longer opt into having their app default hidden, they can remove it by updating their manifest accordingly. When the new version of the app is approved, 

* The app will be Allowed by default as long as the admin has not taken explicit action to Block it.  

* Tenants who have previously blocked the app will still continue to see it as Blocked. 

* For tenants who had never taken an action, that is app remained in `PendingConfig` state, the app will now be Allowed

Apps that are default hidden until admin action continue to be treated in all respects as their original app type whether first-party or third-party.

Customized apps will appear in the third-party category of the store when viewed during permission policy configuration and will not show as “custom apps” in the management experience.

After an admin Allows an app, they can toggle it to Allow/Block as the current experience allows.

When an ISV sets `defaultHideUntilAdminAction:true` the ITPro UI should surface some notification to an Admin informing them that the app has requested action by the Admin before being Allowed to users. The app status will show as ‘Pending Configuration’.

The app with *Pending config state will show as pending config in Manage apps page and admins can allow the app from manage apps page

The App details widget will show pending config with toggle set to blocked 

Saving the app configuration will not effect the app status. Admin will be required to allow the app explicitly

User experience within Teams runtime 
Teams Store 

If an app is submitted with the default status as Blocked, the app will be default hidden from users until an admin takes an action to Allow it.

Desktop/Web 

When app is set to default Block by an app developer, the app will be hidden everywhere where that experience is served by Teams, until Admin Allows it.  This includes but is not limited to the personal app bar, the tab/ME galleries, in chat as a bot, through the meetings experience, etc.

Mobile 

Same experience as in 4.2 will be reflected in Mobile as well.

App upgrades result in no change of behavior except as relates to removal of default Block support 

When an app developer submits an update of a given app, the normal upgrade process will be followed. If the developer once again specifies `defaultHideUntilAdminAction:true`, the app will be default hidden until Admin takes action once again.


Developers can measure how many tenants allow their apps 

We will deliver telemetry to partner center that allows developer to track how many tenants have allowed their apps, and how many users are using it

Default hidden is supported in GCC/GCCH/DOD 

Customers in GCC/GCCH/DOD will also be affected as above when an app developer choose to have their app default Blocked until an Admin takes action. Admin action to allow must be handled in transit and in storage in compliance with the GCC requirements 

Guest users 

Guests will view the app if it is set to Allow in the tenant that they are currently active in.

Anonymous users 

Anonymous users will view the app if it is set to Allow by the tenant that they are currently joined to 

Federated users 

Federated users are technically not supported.

Users in shared channels 

Not currently supported and therefore out of scope.

**To change the configuration settings for the app**

1. In Microsoft Teams admin center, select **Settings** in the app's **Manage apps** page.
1. In **Landing Site URL**, enter the URL and select **Save**. The **Desktop settings are updated** message appears.

    ![Change settings for app](../assets/images/apps-in-meetings/appsettingschange.png)

1. For **Status** for the app, select **Allowed**.
