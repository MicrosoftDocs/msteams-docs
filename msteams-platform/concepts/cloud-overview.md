---
title: Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Cloud tenants

Government Community Cloud (GCC) is a government focused copy of the commercial environment. Department of Defense (DOD) and Federal contractors must meet the stringent cybersecurity and compliance requirements. For this purpose, GCC-High was created to meet the needs of DOD and Federal contractors. GCC-High is a copy of the DOD cloud but exists in its own sovereign environment. The DOD cloud is built for the Department of Defense only.

The following table includes Teams features and availability for GCC, GCC-High, and DOD:

| &nbsp; | GCC | GCC-High | DOD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC. | ✔️ Microsoft apps compliant with GCC-High. | ✔️ Microsoft apps compliant with DOD. |
| 3P or third-party apps | ✔️ Third-party apps are available. Disabled by default and tenant admin use their own discretion to enable it. | ❌ | ❌ |
|Line-of-business apps| ✔️ | ❌ | ❌ |
|Custom apps| ✔️ | ✔️ | ✔️ |
|Sideloading apps | ✔️ | ❌ | ❌ |
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Tabs | ✔️ | ✔️ | ✔️ |
| Bots | ✔️ | ✔️ | ✔️ |
| Message extensions | ✔️ | ✔️ | ✔️ |
| Connectors | ✔️ | ❌ | ❌ |

**Compliance UI**: By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft. The customer is solely responsible for mitigating risks associated with connecting with third party bots in their services. Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service. Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It is your responsibility to ensure that meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on. It is your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.

The following list helps to identify the availability of GCC, GCC-High, and DOD for the features:

* For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md).
* For bots, see [build your first conversational bot for Teams](../get-started/first-app-bot.md), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
* For sideloading apps, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
* For custom connectors, see [create connectors for Microsoft 365 Groups for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).
