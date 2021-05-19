---
title: Enable admins to customize your app
author: heath-hamilton
description: Understand how Teams admins can customize your app for their org.
localization_priority: Normal
ms.author: surbhigupta
ms.topic: overview
---
# Enable admins to customize your Microsoft Teams app

> [!NOTE]
> This feature is currently available in developer preview only.

For orgs using your app, you can allow Teams admins to customize some parts of the app (such as changing the accent color to match their brand). 

This customization is enabled if you define the `configurableProperties` in the manifest schema. For more information, see [Customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

App customization enables admins to change the look-and-feel of the apps loaded through bots, messaging extensions, tabs, and connectors. For example, if the Teams admin customizes the name of an app from *Contoso* to *Contoso Agent*, then the app will appear with the new name *Contoso Agent* to users. However, while adding a connector to a chat, in the list the connectors will still show the name of the app as *Contoso*.

## Best practices

You must provide customization guidelines for app users and customers to follow when customizing your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).
