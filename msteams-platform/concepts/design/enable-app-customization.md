---
title: Enable admins to customize your app
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---
# Enable orgs to customize your Microsoft Teams app

You can allow orgs (specifically Teams admins) to customize some aspects of your Microsoft Teams app. Some possible examples include:

* Changing the app's accent color to match the org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see. (Note: Users adding a connector to a chat will still see the original app name, *Contoso*).

You can enable this feature in the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). (This configures `configurableProperties` in your app manifest.) For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

> [!NOTE]
> App customization is not supported for sideloaded and LOB apps. You cannot test the feature by sideloading the app.

## Best practices

Provide guidelines for customers who want to customize your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).
