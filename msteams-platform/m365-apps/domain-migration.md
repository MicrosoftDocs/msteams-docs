---
title: Teams Domain Migration
description: Learn how to ensure your Teams app's functionality isn't affected by Microsoft Teams domain migration.
ms.date: 01/25/2024
ms.author: surbhigupta
author: v-kushals
ms.topic: Conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---

# Teams Domain Migration

Microsoft’s cloud services are hosted on hundrerds of domains and this fragmentation creates challenges for end user navigation, administrative simplicity, and the development of cross-app experiences. Hence, Microsoft is consolidating new and existing publicly addressable domains necessary for end users to connect to Microsoft apps and services to the new *cloud.microsoft* domain. As part of this consolidation, Microsoft is migrating the current Teams, Outlook, and Microsoft 365 domains from their existing domains to the new *.cloud.microsoft* domain. For example, Teams will move from *teams.microsoft.com* to *teams.cloud.microsoft*. As a result, unless you configure your Teams app to run on these new domains, it will lose critical functionality from June 1, 2024.

## Benefits of a consolidated domain

Consolidating authenticated user-facing Microsoft experiences onto a single domain will benefit all stakeholders in several ways. For end users, it will streamline the overall experience by reducing sign-in prompts, redirects, and delays when navigating across apps. For admins, it will drastically reduce the complexity of the allow-lists required to help your tenant stay secure while enabling users to access the apps and services they need to do their work. For developers, it will lay a foundation for better and tighter integration across the Microsoft ecosystem by streamlining development and improving performance of cross-app experiences.

Microsoft is dedicated to helping developers avoid their apps from losing critical functionality and recommends performing the following steps:

1. Upgrade TeamsJS SDK to version 2.19.0 or higher. For more information, see [Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md).

1. Update your x-frame-options/CSP headers in your Teams app to allow your app to access the following new domains:
    1. *teams.cloud.microsoft*

1. If you want to extend your Teams app across Outlook and Microsoft 365, along with the *teams.cloud.microsoft* domain, ensure you allow the following new domains: 
    2. *outlook.cloud.microsoft*
    3. *m365.cloud.microsoft*

> [!NOTE]
> If you don't perform the actions by June 1, 2024, your app will lose critical functionality. In order to avoid any such issues, please perform the actions mentioned in the article.

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Set up your dev environment for extending Teams apps across Microsoft 365](prerequisites.md)