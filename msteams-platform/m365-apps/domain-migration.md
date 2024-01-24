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

# Teams domain migration

Teams apps use cloud services that are hosted across multiple domains. This division creates challenges for end user navigation, administrative simplicity, and the development of cross-app experiences. Hence, Microsoft has migrated existing domains to the new `*.cloud.microsoft` domain, which includes the current Teams, Outlook, and Microsoft 365 domains. However, the migration affects your app's functionality and requires you to configure your Teams app to ensure uninterrupted end user experience.

> [!WARNING]
> If you don't update your Teams app to run on the new domains by June 1, 2024, your app might lose critical functionality.

The following table lists the domains that are migrated to the new `*.cloud.microsoft` domain and the apps affected by the migration. For a comprehensive list of Microsoft 365 domains, see [Office 365 URLs and IP address ranges](/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide)

| **Existing Domain** | **New Domain** | **App Type** |
| ---- | ---- | ---- |
| *teams.microsoft.com* | *teams.cloud.microsoft* | Teams app |
| *outlook.microsoft.com* | *outlook.cloud.microsoft* | Teams app extended to Outlook |
| *m365.microsoft.com* | *m365.cloud.microsoft* | Teams app extended to Microsoft 365 |

For Teams apps extended across Outlook and Microsoft 365, the list of trusted domains in TeamsJS SDK (v2.19.0 or higher) is migrated to a new content delivery network (CDN) endpoint that Teams calls upon app initialization. This list is dynamic and doesn't require you to update the SDK for any future changes to the domains in the list. The new CDN endpoint ensures that your Teams app extended across Outlook and Microsoft 365 is always enabled to run with full functionality.

## Configure your app to the new domains

To ensure your Teams app doesn't lose critical functionality, you need to perform the following steps:

1. Update TeamsJS SDK to v.2.19.0 or higher. For more information about the latest release of TeamsJS SDK, see [@microsoft/teams-js - npm](https://www.npmjs.com/package/@microsoft/teams-js).

2. Update your [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) or [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers in your Teams app to allow your app to access the *teams.cloud.microsoft* domain.

3. If your Teams app extends across Outlook and Microsoft 365, ensure you allow the following new domains:
    1. *outlook.cloud.microsoft*
    2. *m365.cloud.microsoft*
    3. *teams.cloud.microsoft*

## Benefits of domain migration

Migrating user-facing Microsoft experiences to a single domain offers several benefits to stakeholders.

* For you, it provides better integration across Microsoft apps by streamlining development and improving the performance of cross-app experiences.
* For end users, it reduces sign-in prompts, redirects, and delays when navigating Teams apps.
* For admins, it simplifies managing permissions of end users without compromising the security of your tenant.

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Extend a Teams personal tab across Microsoft 365](extend-m365-teams-personal-tab.md)
* [Set up your dev environment for extending Teams apps across Microsoft 365](prerequisites.md)
* [Build tabs - Prerequisites](../tabs/how-to/tab-requirements.md)
* [Debug for mobile](../toolkit/debug-mobile.md)