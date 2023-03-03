---
title: Distribute your app to specific countries
description: Learn to use geo-fencing to make your app available in specific countries in the Teams app store using. 
author: heath-hamilton
ms.author: v-ypalikila
ms.topic: how-to
ms.localizationpriority: high
---

# Distribute your app to specific countries

> [!NOTE]
> Geo-fencing feature is not supported in GCC, GCCH, and DoD tenants.

If your app has a global audience, you can tailor your app’s listing in the Teams app store in specific countries that you select and communicate what’s great about your app in ways that are relevant to users in different countries.

Geo-fencing helps you improve your app's visibility within the Teams app Store to a particular country. When you publish your app to the store, you can target your release to users in specific countries. Geo-fenced apps use the `UsageLocation` property from the [user resource type](/graph/api/resources/user?view=graph-rest-#properties&preserve-view=true) Graph API to determine the location of the app in Teams app store. For example, a Contoso US app, which sells gift cards that are only valid for users within the United States and Canada is only visible in the US and Canada Teams app store.

The following table describes the `UsageLocation` property:

|Property  |Type  |Description  |
|------------------------------------|---------------------|------------------------------------------------------------|
|`usageLocation`    |string         | A two letter country code (ISO standard 3166). Required for users that will be assigned licenses due to legal requirement to check for availability of services in countries. Examples include: `US`, `JP`, and `GB`. Not nullable.<br> Supports `$filter` (`eq`, `ne`, `not`, `ge`, `le`, `in`, `startsWith`, and `eq` on `null` values).      |

> [!NOTE]
>
> * Geo-fencing is applicable only for apps listed in the Teams app store. Users can search for apps available in other countries using [Microsoft AppSource](https://appsource.microsoft.com/en-US/?exp=ubp8).
> * If your app is not listed in a specific country, users can use the Microsoft AppSource and a deep link to an app to install the app.
