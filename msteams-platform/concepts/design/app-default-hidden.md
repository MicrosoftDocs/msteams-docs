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

By allowing IT Admins to configure apps before making them available to users helps drive a better user experience, and thus drive greater usage of third-party apps.

![App configure before enabling](../assets/images/apps-in-meetings/appconfiguremessage.png)

You can optionally specify whether the app is default blocked in the app manifest by adding the following manifest field:

`Defaulthiddenuntiladminaction:true`
