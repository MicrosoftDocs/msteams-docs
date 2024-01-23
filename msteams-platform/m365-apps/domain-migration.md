---
title: Teams Domain Migration
description: Learn how to ensure your Teams app's functionality is seamless through the Microsoft Teams domain migration.
ms.date: 01/25/2024
ms.author: surbhigupta
author: v-kushals
ms.topic: Conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---

# Teams Domain Migration

Microsoft’s cloud services that Teams apps use are hosted on multiple domains and this fragmentation creates challenges for end user navigation, administrative simplicity, and the development of cross-app experiences. Hence, Microsoft is consolidating new and existing publicly addressable domains necessary for end users to connect to Microsoft apps and services to the new *cloud.microsoft* domain. As part of this consolidation, Microsoft is migrating the current Teams, Outlook, and Microsoft 365 domains from their existing domains to the new *.cloud.microsoft* domain. The Teams domain moves from *teams.microsoft.com* to *teams.cloud.microsoft*. As a result, unless you configure your Teams app to run on these new domains, it will lose critical functionality from June 1, 2024.

## Benefits of a consolidated domain

Consolidating authenticated user-facing Microsoft experiences onto a single domain benefits all stakeholders in several ways.

* For end users, it streamlines the overall experience by reducing sign-in prompts, redirects, and delays when navigating across apps.
* For admins, it drastically reduces the complexity of managing permissions to help your tenant stay secure while enabling users to access the apps and services they need.
* For developers, it lays the foundation for better and tighter integration across the Microsoft ecosystem by streamlining development and improving performance of cross-app experiences.

## Domain changes for Teams apps extended across Outlook and Microsoft 365

| **Existing Domain** | **New Domain** |
| -------------- | -------------- |
| *teams.microsoft.com* | *teams.cloud.microsoft* |
| *outlook.microsoft.com* | *outlook.cloud.microsoft* |
| *m365.microsoft.com* | *m365.cloud.microsoft* |

## Steps to be taken to avoid breaking app functionality

Microsoft is dedicated to helping developers avoid their apps from losing critical functionality and recommends performing the following steps:

1. Upgrade TeamsJS SDK to version 2.19.0 or higher. For more information, see [Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md). From TeamsJS SDK 2.19.0 onwards, the list of trusted domains is migrated to a new content delivery network (CDN) endpoint that would be called upon app initialization. The new list of trusted domains is dynamic and hence any future changes or additions to the list wouldn't require an SDK update. The new CDN endpoint ensures that your Teams app extended across Outlook and Microsoft is always enabled to run with complete functionality.

2. Update your `x-frame-options` and Content Security Policy headers in your Teams app to allow your app to access the following new domains:
    1. *teams.cloud.microsoft*

3. If your Teams app is extended across Outlook and Microsoft 365, along with the *teams.cloud.microsoft* domain, ensure you allow the following new domains:
    1. *outlook.cloud.microsoft*
    2. *m365.cloud.microsoft*

> [!CAUTION]
> If you don't perform the actions by June 1, 2024, your app will lose critical functionality.

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Set up your dev environment for extending Teams apps across Microsoft 365](prerequisites.md)