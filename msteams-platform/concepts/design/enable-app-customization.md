---
title: Enable customization for your Microsoft Teams app allows
author: heath-hamilton
description: In this module, understand how Teams admins can customize your Teams app for their org.
ms.localizationpriority: medium
ms.author: surbhigupta
ms.topic: overview
ms.date: 12/10/2022
---

# Enable customization for your Microsoft Teams app

You can allow customers to customize some aspects of your Microsoft Teams app in the Teams admin center. This feature is supported only for apps published to the Teams store. Sideloaded apps and custom apps (apps published within an org) can't be customized.

Some possible uses of this feature are:

* Changing the app's accent color to match an org's brand.
* Updating the app name from *Contoso* to *Contoso Agent*, which is the name users in the org will see.
(Note: Users adding a connector to a chat or a channel will still see the original app name, *Contoso*.)
* Changing the description to include language and guidance that is better understood by your organization's end-users.
* Changing logo and logo outline to inspire confidence to the end-users to use the app since it seems provided by their organization.

You can enable the feature by defining the app properties that your customers can customize in the [`configurableProperties` section in the Teams app manifest](/microsoftteams/platform/resources/schema/manifest-schema#configurableproperties), starting with version 1.11. You can use [Developer Portal for Teams](https://dev.teams.microsoft.com/home) to edit the manifest of your app.

> [!IMPORTANT]
> You can't test this feature during development. App customization isn't supported when sideloading or publishing to an org's app catalog.

### User considerations

Provide guidelines for customers (specifically Teams admins) who want to customize your app. For more information, see [customize apps in Teams](/microsoftteams/customize-apps).

## See also

* [App manifest schema](/microsoftteams/platform/resources/schema/manifest-schema)
* [Customize apps in the Teams admin center](/microsoftteams/customize-apps)
* [Distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md)
