---
title: Teams Domain Migration
description: Learn how to ensure your Teams app's functionality is seamless through the Microsoft Teams domain migration.
ms.date: 01/25/2024
ms.author: surbhigupta
author: surbhigupta
ms.topic: Conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---

# Teams Domain Migration

Microsoft’s cloud services that Teams apps use are hosted on multiple domains and this fragmentation creates challenges for end user navigation, administrative simplicity, and the development of cross-app experiences. Hence, Microsoft is consolidating new and existing domains to the new *cloud.microsoft* domain, which includes the current Teams, Outlook, and Microsoft 365 domains. Hence, you need to configure your Teams app to run on these new domains.

> [!CAUTION]
> If you don't configure your Teams app to run on the new domains by June 1, 2024, your app will lose critical functionality.

## Benefits of consolidated domain

Consolidating user-facing Microsoft experiences onto a single domain benefits stakeholders in several ways.

* For you, it provides better integration across Microsoft apps by streamlining development and improving performance of cross-app experiences.
* For end users, it reduces sign-in prompts, redirects, and delays when navigating Teams apps.
* For admins, it simplifies managing permissions of end users without compromising the security of your tenant.

## New consolidated domains

| **Existing Domain** | **New Domain** | **App Type** |
| ---- | ---- | ---- |
| *teams.microsoft.com* | *teams.cloud.microsoft* | Teams app |
| *outlook.microsoft.com* | *outlook.cloud.microsoft* | Teams app extended across Outlook and Microsoft 365 |
| *m365.microsoft.com* | *m365.cloud.microsoft* | Teams app extended across Outlook and Microsoft 365 |

## How to avoid breaking app functionality

The following steps need to be performed in order to ensure your Teams app doesn't lose critical functionality:

1. Upgrade TeamsJS SDK to version 2.19.0 or higher. For more information, see [Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md).

2. Update your `x-frame-options` and Content Security Policy headers in your Teams app to allow your app to access the following new domains:
    1. *teams.cloud.microsoft*

3. If your Teams app extends across Outlook and Microsoft 365, along with the *teams.cloud.microsoft* domain, ensure you allow the following new domains:
    1. *outlook.cloud.microsoft*
    2. *m365.cloud.microsoft*

> [!NOTE]
> * From TeamsJS SDK 2.19.0 onwards, the list of trusted domains is migrated to a new content delivery network (CDN) endpoint that would be called upon app initialization.
> * This list is dynamic and doesn't require you to update the SDK for any future changes to the list.
> * The new CDN endpoint ensures that your Teams app extended across Outlook and Microsoft 365 is always enabled to run with full functionality.

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Extend a Teams personal tab across Microsoft 365](extend-m365-teams-personal-tab.md)
* [Set up your dev environment for extending Teams apps across Microsoft 365](prerequisites.md)]
* [Prerequisites](../tabs/how-to/tab-requirements.md)
* [Guidelines to create or upgrade a message extension plugin for Copilot for Microsoft 365](../messaging-extensions/high-quality-message-extension.md)
* [Debug for mobile](../toolkit/debug-mobile.md)