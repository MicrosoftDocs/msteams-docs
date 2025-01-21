---
title: Enable Customization for App
author: heath-hamilton
description: Learn how Teams admins can customize your Teams app for their org by changing the app's accent color, description, logo and its outline, and app name.
ms.localizationpriority: medium
ms.author: surbhigupta
ms.topic: overview
ms.date: 12/10/2022
---

# Enable customization for your Microsoft Teams app

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Microsoft Teams Store. Custom apps published within an organization can't be customized.

Some possible uses of this feature are:

* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org can see.
(Note: Users adding a connector to a chat or a channel can still see the original app name, *Contoso*.)
* Changing the description to include language and guidance that is better understood by your organization's end-users.
* Changing logo and logo outline to inspire confidence to the end-users to use the app since it seems provided by their organization.
* Changing the app's accent color to match an org's brand.

You can enable admins to customize apps by defining the app properties. The customers can customize the [`configurableProperties` section](/microsoftteams/platform/resources/schema/manifest-schema#configurableproperties) in the app manifest (previously called Teams app manifest), starting with version 1.11. You can use [Developer Portal for Teams](https://dev.teams.microsoft.com/home) to edit the app manifest of your app.

> [!IMPORTANT]
> You can't test this feature during development. App customization isn't supported when publishing to an org's app catalog.

### User considerations

Provide guidelines for Teams Administrators who want to customize your app. For more information on how admins can customize, see [customize apps in Teams](/microsoftteams/customize-apps).

## See also

[Customize your organization's app store](/microsoftteams/customize-your-app-store)

