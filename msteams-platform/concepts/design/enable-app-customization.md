---
title: Enable your app to be customized
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---
# Enable your Microsoft Teams app to be customized

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and apps published for an org can't be customized.

Some possible examples of this feature include:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see. (Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)

You can enable this feature in the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). This configures `configurableProperties`, which aren't available in versions prior to 1.10 of the Teams app manifest.

## Test your app

You cannot test this feature during development. App customization is not supported for sideloading or publishing to an organization's app catalog.

## User considerations

As the app publisher, provide the following information to customers in Teams admins:
* Include a note recommending to test customization changes in a Teams test tenant before making changes in their production environment. 
* Provide best practices for how to customize your app.

## See also

* [Customize apps in the Teams admin center](/MicrosoftTeams/customize-apps)
