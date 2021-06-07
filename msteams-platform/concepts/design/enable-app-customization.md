---
title: Enable admins to customize your app
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---
# Enable orgs to customize your Microsoft Teams app

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and apps published for an org can't be customized.

Some possible examples of this feature include:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see. (Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)

You can enable this feature in the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). (This configures `configurableProperties` in your app manifest.) For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

## Test your app

To test app customization, submit the latest version of app manifest, and use a test tenant to verify your changes. App customization does not support sideloading. You cannot test the feature by sideloading the app. 


## Best practices

Provide guidelines for customers who want to customize your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).
